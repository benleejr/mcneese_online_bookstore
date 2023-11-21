// components/ShoppingCart.tsx

import React from 'react';
import { useCart } from '../pages/context/CartContext';

const ShoppingCart = () => {
  const { state, dispatch } = useCart();

  const handleIncrement = (id: string) => {
    dispatch({ type: 'INCREMENT', payload: { id } });
  };

  const handleDecrement = (id: string) => {
    dispatch({ type: 'DECREMENT', payload: { id } });
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    const parsedQuantity = parseInt(quantity, 10);
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity: parsedQuantity } });
  };

  const calculateTotal = () => {
    return parseFloat(
      state.cartItems.reduce((total, item) => {
        console.log('Price:', item.price); // Debugging line
        console.log('Quantity:', item.quantity); // Debugging line
        return total + item.price * item.quantity;
      }, 0).toFixed(2)
    );
  };

  return (
    <>
        <div className="cart-container">
        {state.cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.primaryImageURL} alt={item.name} className="cart-item-image"/>
              <span className="cart-item-name">{item.name}</span>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <span className="cart-item-price">${item.price.toFixed(2)}</span>
            </div>            
          ))}
          <div className="total-price">
            Total: ${calculateTotal().toFixed(2)}
          </div>
      </div>
    <style jsx>{`
            .cart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 800px; // Set a max-width that suits your design
            margin: auto;
            }
            .cart-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            width: 100%; // Take full width to center content
            justify-content: space-between; // This will push the image and name to the left and controls to the right
            }
            .cart-item-image {
            max-width: 250px;
            max-height: 250px; 
            margin-right: 10px;
            object-fit: contain; 
            }
            .cart-item-name {
            flex-grow: 1;
            margin-right: auto;
            }
            .quantity-controls {
            display: flex;
            align-items: center;
            }
            .quantity-input {
            width: 3em; 
            text-align: center;
            }
        `}</style>
      </>
      );
};

export default ShoppingCart;
