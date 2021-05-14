import React, { useContext } from 'react';
import dynamic from 'next/dynamic'

import styles from './styles.module.css'
import { ContextTree } from '../../contexts/ContextTree';

const Tree = dynamic(() => import('react-d3-tree'))

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

export const TreeGraph: React.FC = () => {
  const {treeRawNodeDatum, createNewTree} = useContext(ContextTree)

  return (
    <div>
      <div
        id="treeWrapper"
        className={styles.treeContainer}
      >
        {
          treeRawNodeDatum && (<Tree
            data={treeRawNodeDatum}
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
