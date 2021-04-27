import React from 'react';

import styles from './styles.module.css';

export const Canvas: React.FC = () => {
  return (
    <div className={styles.canvasContainer}>
      <canvas className={styles.canvas} width={600} height={500}></canvas>
    </div>
  );
}

