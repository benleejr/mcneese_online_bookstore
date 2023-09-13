import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; // Replace 'any' with the actual session type if known
  };
}

const App = ({ Component, pageProps }: MyAppProps) => {
  const session = 'session' in pageProps ? pageProps.session : undefined;

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};



export default App;