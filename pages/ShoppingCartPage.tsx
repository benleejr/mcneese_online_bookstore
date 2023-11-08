// pages/ShoppingCartPage.tsx

import React from 'react';
import { CartProvider, useCart } from '../pages/context/CartContext';
import Layout from "../components/Layout";

const ShoppingCartPage = () => {
  const { state, dispatch } = useCart();

  const handleIncrement = (id: string) => {
    dispatch({ type: 'INCREMENT', payload: { id } });
  };

  const handleDecrement = (id: string) => {
    dispatch({ type: 'DECREMENT', payload: { id } });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    // You will need to implement an action for setting quantity directly if it's not already done
    dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } });
  };

  return (
    <CartProvider>
      <Layout>
        <div>
          {state.cartItems.map(item => (
             <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
             <img src={item.primaryImageURL} alt={item.name} style={{ marginRight: '10px' }} />
             <span>{item.name}</span>
              <div>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </CartProvider>
  );
};

export default ShoppingCartPage;
