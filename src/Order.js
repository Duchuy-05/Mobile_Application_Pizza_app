import React, { useState, useMemo, useContext } from 'react';
import { CartContext } from './CartContext';

const Order = ({ product, onBack, onAddToCart }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialOpts = {};
    if (product.options) {
      product.options.forEach(opt => {
        initialOpts[opt.id] = opt.choices[0];
      });
    }
    return initialOpts;
  });

  const [selectedAddons, setSelectedAddons] = useState([]);

  const totalPrice = useMemo(() => {
    let price = product.basePrice;
    Object.values(selectedOptions).forEach(choice => {
      price += choice.priceModifier;
    });
    selectedAddons.forEach(addon => {
      price += addon.price;
    });
    return price * quantity;
  }, [product, selectedOptions, selectedAddons, quantity]);

  const handleOptionChange = (optionId, choice) => {
    setSelectedOptions(prev => ({ ...prev, [optionId]: choice }));
  };

  const handleAddonChange = (addon) => {
    setSelectedAddons(prev => {
      const isExist = prev.find(a => a.id === addon.id);
      if (isExist) return prev.filter(a => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  const handleAdd = () => {
    const orderItem = {
      product: product,
      options: selectedOptions,
      addons: selectedAddons,
      quantity: quantity,
      totalPrice: totalPrice
    };
    addToCart(orderItem);
    onAddToCart(); 
  };

  return (
    <div className="fade-in" style={{ padding: 20 }}>
      <button className="btn-outline" onClick={onBack}>⬅ Quay lại Menu</button>
      <h2>Tùy chỉnh: {product.name}</h2>
      
      {product.options && product.options.map(opt => (
        <div key={opt.id} style={{ margin: '15px 0' }}>
          <h4>{opt.name}</h4>
          {opt.choices.map(choice => (
            <label key={choice.id} style={{ display: 'block', margin: '8px 0', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name={opt.id} 
                checked={selectedOptions[opt.id]?.id === choice.id}
                onChange={() => handleOptionChange(opt.id, choice)}
                style={{ marginRight: 10 }}
              />
              {choice.name} {choice.priceModifier > 0 ? `(+${choice.priceModifier.toLocaleString()}đ)` : ''}
            </label>
          ))}
        </div>
      ))}

      {product.addons && product.addons.length > 0 && (
        <div style={{ margin: '15px 0', borderTop: '1px dashed #ccc', paddingTop: 15 }}>
          <h4>Mua thêm</h4>
          {product.addons.map(addon => (
            <label key={addon.id} style={{ display: 'block', margin: '8px 0', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={!!selectedAddons.find(a => a.id === addon.id)}
                onChange={() => handleAddonChange(addon)}
                style={{ marginRight: 10 }}
              />
              {addon.name} (+{addon.price.toLocaleString()}đ)
            </label>
          ))}
        </div>
      )}

      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
        <h4 style={{ margin: '0 15px 0 0' }}>Số lượng: </h4>
        <button className="btn-outline" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span style={{ margin: '0 20px', fontSize: 18, fontWeight: 'bold' }}>{quantity}</span>
        <button className="btn-outline" onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>

      <h3 style={{ color: '#e74c3c' }}>Tổng tạm tính: {totalPrice.toLocaleString()} VNĐ</h3>
      <button className="btn-primary" onClick={handleAdd} style={{ marginTop: 10 }}>
        Thêm vào Giỏ hàng
      </button>
    </div>
  );
};

export default Order;