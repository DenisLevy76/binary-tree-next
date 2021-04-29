import React from 'react'
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <NavigationBar/>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
