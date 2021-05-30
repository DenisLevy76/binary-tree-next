import React, { useContext, useState } from 'react';
import { ContextTree } from '../../contexts/ContextTree';

import styles from './styles.module.css';

const Buttons: React.FC = () => {
  const {createNewTree, handleButtonClick, tree} = useContext(ContextTree)
  const [nNodes, setNNodes] = useState(0);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Algorithm</h2>
      <input type="number" className={styles.inputNumber} onChange={(e) => setNNodes(Number(e.target.value))} placeholder="Number of nodes"/>
      <button type="button" className={styles.button} onClick={() => createNewTree(nNodes)}>Create tree</button>
      <button type="button" disabled={!tree} className={styles.button} onClick={() => handleButtonClick("Pre order", 'preOrder')}>Pre order</button>
      <button type="button" disabled={!tree} className={styles.button} onClick={() => handleButtonClick("In order", 'inOrder')}>In order</button>
      <button type="button" disabled={!tree} className={styles.button} onClick={() => handleButtonClick("Post order", 'postOrder')}>Post order</button>
      <button type="button" disabled={!tree} className={styles.button} onClick={() => handleButtonClick("Breadth-first search", 'BFS')}>breadth-first search</button>
    </div>
  );
}

export default Buttons;
