import React from 'react';

import styles from './styles.module.css';

const Buttons: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Algoritmos</h2>
      <button type="button" className={styles.button} >Gerar árvore</button>
      <button type="button"className={styles.button} >Pré-ordem</button>
      <button type="button"className={styles.button} >Em ordem</button>
      <button type="button"className={styles.button} >Pós-ordem</button>
      <button type="button"className={styles.button} >Em largura</button>
    </div>
  );
}

export default Buttons;
