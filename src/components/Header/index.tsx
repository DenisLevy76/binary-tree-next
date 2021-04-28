import React from 'react';
import Image from 'next/image'


import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <img src="/logo.png" alt="Binary Tree logo" className={styles.image}/>
    </header>
  );
}

export default Header;
