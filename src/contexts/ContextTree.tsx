import React, { createContext, useEffect, useState } from 'react'
import { randomTree } from '../utils/randomTree';
import { NodeTree } from '../utils/tree';


interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

interface msgData{
  title?: string;
  body: string;
}

interface createContextData{
  treeRawNodeDatum: RawNodeDatum;
  tree: NodeTree;
  history: msgData[];
  createNewTree: (number: number) => void;
  handleButtonClick: (msgTitle: string, option: 'preOrder' | 'inOrder' | 'postOrder' | 'BFS') => void;
}

export const ContextTree = createContext({} as createContextData)

export const ContextTreeProvider: React.FC = ({children}) => {
  const [treeRawNodeDatum, setTreeRawNodeDatum] = useState(null as RawNodeDatum)
  const [tree, setTree] = useState(null as NodeTree)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (tree){
      sendMsg("Tree created", tree.toString())
      if (tree.isBalanced()){
        sendMsg('', 'Balanced')
      }
      else{
        sendMsg('', 'Unbalanced')
      }
    }
  }, [tree])

  function sendMsg(title: string = '', body: string){
    const msg: msgData = {title, body}
    setHistory((history) => [...history, msg])
  }

  function createNewTree(number: number){
    if (!number || number <= 0){
      alert('Enter the number of nodes')
      return
    }
    const randomNumbers: number[] = randomTree(number);
    const newTree: NodeTree = new NodeTree(randomNumbers[0]);

    randomNumbers.map((number, index) => {
      if (index > 0) newTree.insert(number);
    })

    const treeRawNodeDatum: RawNodeDatum = newTree.convertToRawNodeDatum()

    setTree(newTree);
    setTreeRawNodeDatum(treeRawNodeDatum);
  }

  function handleButtonClick(msgTitle: string, option: 'preOrder' | 'inOrder' | 'postOrder' | 'BFS'){
    if(!tree){
      return
    }

    const body = tree[option]().join(', ')

    sendMsg(msgTitle, body)
  }

  return (
    <ContextTree.Provider value={{
      treeRawNodeDatum,
      tree,
      history,
      createNewTree,
      handleButtonClick,
    }}>
      {children}
    </ContextTree.Provider>
  )
}
