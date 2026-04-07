import React, { createContext, useState } from 'react';

// Tạo Context
export const CartContext = createContext();

// Provider bọc ngoài ứng dụng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartItemId: Date.now() }]);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};