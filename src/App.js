import React, { useState } from 'react';
import mockData from './data.json';

// Import CSS dùng chung toàn cục
import './App.css';
import './Buttons.css';

// Import Context và các Màn hình (Components)
import { CartProvider } from './CartContext';
import Home from './Home';
import Order from './Order';
import Cart from './Cart';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <div className="app-container">
        
        {currentScreen === 'HOME' && (
          <Home 
            data={mockData} 
            onSelectProduct={(prod) => {
              const fullProduct = {
                ...prod,
                options: mockData.globalOptions.filter(opt => prod.optionIds?.includes(opt.id)),
                addons: mockData.globalAddons.filter(ad => prod.addonIds?.includes(ad.id))
              };
              setSelectedProduct(fullProduct);
              setCurrentScreen('ORDER');
            }}
            onGoToCart={() => setCurrentScreen('CART')}
          />
        )}

        {currentScreen === 'ORDER' && selectedProduct && (
          <Order 
            product={selectedProduct} 
            onBack={() => setCurrentScreen('HOME')}
            onAddToCart={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'CART' && (
          <Cart 
            onBack={() => setCurrentScreen('HOME')}
            onCheckoutSuccess={() => setCurrentScreen('HOME')}
          />
        )}
        
      </div>
    </CartProvider>
  );
};

export default App;