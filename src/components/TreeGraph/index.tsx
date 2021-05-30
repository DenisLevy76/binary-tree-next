import React, { ReactNode, useContext } from 'react';
import dynamic from 'next/dynamic'

import styles from './styles.module.css'
import { ContextTree } from '../../contexts/ContextTree';
import { CgMaximizeAlt } from 'react-icons/cg'
import { FiX } from 'react-icons/fi'

const Tree = dynamic(() => import('react-d3-tree'))

interface TreeGraphProps{
  children?: ReactNode;
  modal?: boolean;
}

export const TreeGraph = ( { modal }: TreeGraphProps) => {
  const {treeRawNodeDatum, handleModalClose, setHandleModalClose} = useContext(ContextTree)

  return (
    <div>
      <div
        id="treeWrapper"
        className={ modal ? styles.treeContainerModal : styles.treeContainer}
      >
        <button type="button" className={styles.button} disabled={!treeRawNodeDatum} onClick={() => setHandleModalClose(c => !c)}>{handleModalClose? <FiX /> : <CgMaximizeAlt />}</button>
        {
          treeRawNodeDatum && (<Tree
            data={treeRawNodeDatum}
            orientation="vertical"
            translate={{
              x: 240,
              y: 30
            }}
            nodeSize={{x: 130, y: 180}}
            />)
        }
      </div>
    </div>
  );
}
