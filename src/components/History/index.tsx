import React, { useState } from 'react';

import styles from './styles.module.css';

const History: React.FC = () => {
  const [history, setHistory] = useState([])
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>History</h2>
      <ul className={styles.ul}>
        {history.map(msg => <li>msg</li>)}

      </ul>
    </div>
  );
}

export default History;
