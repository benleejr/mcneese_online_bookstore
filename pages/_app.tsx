import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; // Replace 'any' with the actual session type if known
  };
}

const App = ({ Component, pageProps }: MyAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
