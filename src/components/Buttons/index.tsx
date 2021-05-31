import React from 'react';

import styles from './styles.module.css';

const Buttons: React.FC = ({ children }) => {

  return (
    <div className={styles.container}>
      { children }
    </div>
  );
}

export default Buttons;
