import React, { useContext, useEffect, useRef } from 'react';
import { ContextTree } from '../../contexts/ContextTree';

import styles from './styles.module.css';

const History: React.FC = () => {
  const { history } = useContext(ContextTree)
  const liRef = useRef<HTMLUListElement>()

  useEffect(() => {
    liRef.current.scrollTop = liRef.current.scrollHeight
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>History</h2>
      <ul className={styles.ul} ref={liRef}>
        {history.map((msg, index) => (
            <li key={index} className={styles.li}>
              {styles.h3 && <h3 className={styles.h3}>{msg.title}</h3>}
              <p className={styles.p}>{msg.body}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default History;
