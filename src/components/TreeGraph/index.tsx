import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic'
// import { randomTree } from '../../utils/randomTree';
// import { NodeTree } from '../../utils/tree';

import styles from './styles.module.css'
import { ContextTree } from '../../contexts/ContextTree';

const Tree = dynamic(() => import('react-d3-tree'))

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

export const TreeGraph: React.FC = () => {
  const {tree, createNewTree} = useContext(ContextTree)

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
