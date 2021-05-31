import React from 'react';

import styles from './styles.module.css'

const Button = ({children, ...orders}) => {
  return <button type="button" className={styles.button} {...orders}>{children}</button>;
}

export default Button;
