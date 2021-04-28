import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { randomTree } from '../../utils/randomTree';
import { NodeTree } from '../../utils/tree';

import styles from './styles.module.css'

const Tree = dynamic(() => import('react-d3-tree'))

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

export const TreeGraph: React.FC = () => {
  const [numberOfNodes, setNumberOfNodes] = useState(0);
  const [tree, setTree] = useState(null as RawNodeDatum)

  function createNewTree(number: number){
    const randomNumbers: number[] = randomTree(number);
    const newTree: NodeTree = new NodeTree(randomNumbers[0]);

    randomNumbers.map((number, index) => {
      if (index > 0) newTree.insert(number);
    })

    const treeRawNodeDatum: RawNodeDatum = newTree.convertToRawNodeDatum()

    setTree(treeRawNodeDatum);
  }

  return (
    <div>
      <div
        id="treeWrapper"
        className={styles.treeContainer}
      >
        {
          tree && (<Tree
            data={tree}
            orientation="vertical"
            translate={{
              x: 240,
              y: 30
            }}
            />)
        }
      </div>
    </div>
  );
}
