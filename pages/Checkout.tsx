// pages/Checkout.tsx
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import PaymentForm from '../components/PaymentForm'; 
import Layout from '../components/Layout';
import { useCart } from './context/CartContext';

const CheckoutPage = () => {
  const { state, dispatch } = useCart(); // Using useCart to get the cart items

  const calculateTotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getOrderItems = () => {
    return state.cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      type: item.type
    }));
  };

  return (
    <Layout>
      <div className="checkout-container">
        <div className="shopping-cart">
          <ShoppingCart />
        </div>
        <div className="payment-form">
          <PaymentForm getOrderItems={getOrderItems} calculateTotal={calculateTotal} dispatch={dispatch} />
        </div>
      </div>
      <style jsx>{`
        .checkout-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 20px; 
          gap: 20px; 
        }

        .shopping-cart {
          flex: 1; 
          margin-right: 20px; 
        }
        .payment-form {
          flex: 1;
          min-width: 0; 
          width: 50%; 
          max-width: 100%; 
        }
        
        // You can also add media queries to adjust for smaller screens
        @media (max-width: 768px) {
          .checkout-container {
            flex-direction: column;
            align-items: center;
          }
          .shopping-cart,
          .payment-form {
            width: 100%; 
            max-width: 100%;
          }
        }
      `}</style>
  </Layout>
  );
};

export default CheckoutPage;