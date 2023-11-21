// components/PaymentForm.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../pages/context/CartContext';

type CartItem = {
  bookId?: string;
  stationeryId?: string;
  quantity: number;
  price: number; // Added this line
  type: 'Book' | 'Stationery';
};

const PaymentForm = () => {
  const { state, dispatch } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const calculateTotal = () => {
    return parseFloat(
      (state.cartItems as CartItem[]).reduce((total, item) => {
        console.log('Price:', item.price); 
        console.log('Quantity:', item.quantity); 
        return total + item.price * item.quantity;
      }, 0).toFixed(2)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      console.log('Stripe has not loaded yet.');
      return;
    }
  
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      console.log('[error]', error);
      return;
    }
  
    const paymentSuccess = await handlePaymentSuccess(paymentMethod);
    const total = calculateTotal();
    console.log('Total before sending:', total);
    if (paymentSuccess) {
      dispatch({ type: 'CLEAR_CART' }); // Clear the cart if payment succeeds
      router.push(`/CheckoutComplete?order=${paymentSuccess.orderId}`);
    } else {
      console.error('Payment failed');
    }
  };
  
  const handlePaymentSuccess = async (paymentMethod) => {
    console.log(state.cartItems);
    const total = calculateTotal();
    console.log('Total:', total);
    const items = (state.cartItems as CartItem[]).map(item => ({
      bookId: item.type === 'Book' ? item.bookId : null,
      stationeryId: item.type === 'Stationery' ? item.stationeryId : null,
      quantity: item.quantity,
    }));
    
    console.log(items);
  
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items,
        total: calculateTotal(),
        paymentMethodId: paymentMethod.id,
      }),
      credentials: 'include'
    });
  
    if (response.ok) {
      return response.json();
    }
    return null; 
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="input-wrapper">
        <input type="text" placeholder="Cardholder Name" required />
      </div>
      <div className="card-element-wrapper">
        <CardElement options={{
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0',
              },
            },
            invalid: {
              color: '#E25950',
            },
          },
        }} />
      </div>
      <button type="submit" disabled={!stripe}>Pay</button>
      <style jsx>{`
        .payment-form {
          display: flex;
          flex-direction: column;
          align-items: stretch; /* This ensures that the children stretch to the parent's width */
          gap: 20px;
          max-width: 500px; /* Adjust or remove this as needed */
          margin: auto;
        }

        .input-wrapper {
          margin-bottom: 20px; /* Adjust space between inputs */
        }

        .card-element-wrapper {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fafafa;
        }

        .payment-form button {
          background-color: #22a6b3;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          margin-top: 20px; /* Space between CardElement and the button */
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .payment-form button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .payment-form button:not(:disabled):hover {
          background-color: #1e9aa8;
        }
      `}</style>
</form>
  );
};

export default PaymentForm;