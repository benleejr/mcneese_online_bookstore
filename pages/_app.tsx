// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from 'pages/context/CartContext'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; // Replace 'any' with the actual session type if known
  };
}

const App = ({ Component, pageProps }: MyAppProps) => {
  return (
    <Elements stripe={stripePromise}>
      <SessionProvider session={pageProps.session}>
        <CartProvider> {/* Wrap with CartProvider */}
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </Elements>
  );
};

export default App;