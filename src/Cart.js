import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = ({ onBack, onCheckoutSuccess }) => {
  const { cart, clearCart } = useContext(CartContext);

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    alert("Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
    clearCart();
    onCheckoutSuccess();
  };

  return (
    <div className="fade-in" style={{ padding: 20 }}>
      <button className="btn-outline" onClick={onBack}>⬅ Tiếp tục mua sắm</button>
      <h2>Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: 50 }}>Giỏ hàng đang trống.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.cartItemId} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>{item.quantity}x {item.product.name}</h4>
              <ul style={{ fontSize: '0.9em', color: '#555', margin: 0 }}>
                {Object.values(item.options).map(opt => (
                  <li key={opt.id}>{opt.name}</li>
                ))}
                {item.addons.map(addon => (
                  <li key={addon.id}>{addon.name}</li>
                ))}
              </ul>
              <p style={{ fontWeight: 'bold', color: '#2c3e50', marginTop: 10 }}>
                Thành tiền: {item.totalPrice.toLocaleString()} VNĐ
              </p>
            </div>
          ))}
          <h2 style={{ textAlign: 'right', marginTop: 30, color: '#e74c3c' }}>
            Tổng thanh toán: {grandTotal.toLocaleString()} VNĐ
          </h2>
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <button className="btn-primary" onClick={handleCheckout} style={{ padding: '15px 30px', fontSize: '18px', background: '#2ecc71' }}>
              Xác nhận Đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;