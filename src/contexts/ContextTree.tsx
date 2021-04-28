import React, { createContext, useState } from 'react'
import { randomTree } from '../utils/randomTree';
import { NodeTree } from '../utils/tree';

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

interface createContextData{
  numberOfNodes: number;
  tree: RawNodeDatum;
  createNewTree: (number: number) => void;
}


export const ContextTree = createContext({} as createContextData)

export const ContextTreeProvider: React.FC = ({children}) => {
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
    <ContextTree.Provider value={{
      numberOfNodes,
      tree,
      createNewTree,
    }}>
      {children}
    </ContextTree.Provider>
  )
}
