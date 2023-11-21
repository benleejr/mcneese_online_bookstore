// pages/ShoppingCart.tsx

import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import Layout from "../components/Layout";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Action = 
  | { type: 'INCREMENT'; payload: { id: string; } }
  | { type: 'DECREMENT'; payload: { id: string; } }
  | { type: 'SET_QUANTITY'; payload: { id: string; quantity: number; } };

const ShoppingCartPage = () => {
  const { state, dispatch } = useCart();
  const { data: session } = useSession();

  const handleIncrement = (id: string) => {
    dispatch({ type: 'INCREMENT', payload: { id } });
  };

  const handleDecrement = (id: string) => {
    dispatch({ type: 'DECREMENT', payload: { id } });
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    console.log('handleQuantityChange called:', id, quantity);
    let parsedQuantityNumber = parseInt(quantity);
    if (isNaN(parsedQuantityNumber)) {
      return;
    }
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity: parsedQuantityNumber } });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const calculateTotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0); 
  };

  return (
    <CartProvider>
      <Layout>
        <div className="cart-container">
          {state.cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.primaryImageURL} alt={item.name} className="cart-item-image"/>
              <span className="cart-item-name">{item.name}</span>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={state.cartItems.find(cartItem => cartItem.id === item.id)?.quantity || ''}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <span className="cart-item-price">${item.price.toFixed(2)}</span>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>            
          ))}
          <div className="total-price">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          {!session && (
          <div className="checkout-message">
            You are not logged in. Please log in to proceed to checkout.
          </div>
        )}
        {session && (
          <Link href="/Checkout">
            <button className="checkout-button">Checkout</button>
          </Link>
        )}
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
        .cart-item-name {flex-grow: 1;
          margin-right: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
        }
        .quantity-input {
          width: 3em;
          text-align: center;
          appearance: none;
          -moz-appearance: textfield;
        }        
        .quantity-input::-webkit-inner-spin-button,
        .quantity-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
      
      </Layout>
    </CartProvider>
  );
};

export default ShoppingCartPage;
