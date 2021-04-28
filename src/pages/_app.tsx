import React from 'react'
import { ContextTreeProvider } from '../contexts/ContextTree';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ContextTreeProvider>
        <Component {...pageProps} />
      </ContextTreeProvider>
    </div>
  );
}

export default MyApp;
