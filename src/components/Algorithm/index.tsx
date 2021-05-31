import React, { useContext, useState } from 'react';
import { ContextTree } from '../../contexts/ContextTree';
import Button from '../Button';
import Buttons from '../Buttons';

import styles from './styles.module.css'

const Algorithm: React.FC = () => {
  const {createNewTree, handleButtonClick, tree} = useContext(ContextTree)
  const [nNodes, setNNodes] = useState(0);

  return (
    <Buttons>
      <h2 className={styles.h2}>Algorithm</h2>
      <input type="number" className={styles.inputNumber} onChange={(e) => setNNodes(Number(e.target.value))} placeholder="Number of nodes"/>
      <Button onClick={() => createNewTree(nNodes)}>Create tree</Button>
      <Button disabled={!tree} onClick={() => handleButtonClick("Pre order", 'preOrder')}>Pre order</Button>
      <Button disabled={!tree} onClick={() => handleButtonClick("In order", 'inOrder')}>In order</Button>
      <Button disabled={!tree} onClick={() => handleButtonClick("Post order", 'postOrder')}>Post order</Button>
      <Button disabled={!tree} onClick={() => handleButtonClick("Breadth-first search", 'BFS')}>breadth-first search</Button>
    </Buttons>
  );
}

export default Algorithm;
