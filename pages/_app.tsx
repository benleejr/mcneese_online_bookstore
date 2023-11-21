// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from 'pages/context/CartContext'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; 
  };
}

const App = ({ Component, pageProps }: MyAppProps) => {
  return (
    <>
      <Head>
        <title>McNeese Online Bookstore</title>
      </Head>
      
      <Elements stripe={stripePromise}>
        <SessionProvider session={pageProps.session}>
          <CartProvider> {/* Wrap with CartProvider */}
            <Component {...pageProps} />
          </CartProvider>
        </SessionProvider>
      </Elements>
    </>
  );
};

export default App;
