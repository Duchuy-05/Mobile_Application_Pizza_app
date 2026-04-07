import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import './Home.css'; // CSS riêng của Home

const Home = ({ data, onSelectProduct, onGoToCart }) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]?.id);
  const { cart } = useContext(CartContext);

  const filteredProducts = data.products.filter(p => p.categoryId === activeCategory);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Menu Trực Tuyến</h2>
        <button className="btn-primary" onClick={onGoToCart}>
          Giỏ hàng ({cart.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
        {data.categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)}
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="product-grid fade-in">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="product-card slide-up-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <img src={product.image} alt={product.name}  />
            <h3>{product.name}</h3>
            <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
              {product.basePrice.toLocaleString()} VNĐ
            </p>
            <button className="btn-primary" onClick={() => onSelectProduct(product)} style={{ width: '100%' }}>
              Chọn mua
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;