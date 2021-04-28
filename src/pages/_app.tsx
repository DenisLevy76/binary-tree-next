import React from 'react'
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
