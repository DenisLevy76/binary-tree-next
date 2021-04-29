import React, { createContext, useEffect, useState } from 'react'
import { randomTree } from '../utils/randomTree';
import { BFS, isBalanced, NodeTree } from '../utils/tree';

interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

interface msgData{
  title: string;
  body: string;
}

interface createContextData{
  numberOfNodes: number;
  treeRawNodeDatum: RawNodeDatum;
  tree: NodeTree;
  history: msgData[];
  createNewTree: (number: number) => void;
  preOrder: (root: NodeTree) => void;
  inOrder: (root: NodeTree) => void;
  postOrder: (root: NodeTree) => void;
  handleButtonClick: (msgTitle: string, callback: (tree: NodeTree) => void) => void;
  handleButtonBFS: () => void;
}


export const ContextTree = createContext({} as createContextData)

export const ContextTreeProvider: React.FC = ({children}) => {
  const [numberOfNodes, setNumberOfNodes] = useState(0);
  const [treeRawNodeDatum, setTreeRawNodeDatum] = useState(null as RawNodeDatum)
  const [tree, setTree] = useState(null as NodeTree)
  const [history, setHistory] = useState([])
  let array: number[] = []

  useEffect(() => {
    if (tree){
      if (isBalanced(tree)){
        const msg: msgData = {title: "Is balanced!", body: ""}
        setHistory((history) => [...history, msg])
      }
      else{
        const msg = {title: "Is not balanced", body: ""}
        setHistory((history) => [...history, msg])
      }

    }
  }, [tree])

  function createNewTree(number: number){
    const randomNumbers: number[] = randomTree(number);
    const newTree: NodeTree = new NodeTree(randomNumbers[0]);

    randomNumbers.map((number, index) => {
      if (index > 0) newTree.insert(number);
    })

    const treeRawNodeDatum: RawNodeDatum = newTree.convertToRawNodeDatum()

    setTree(newTree);
    setTreeRawNodeDatum(treeRawNodeDatum);
  }

  function preOrder(root: NodeTree){
    if (!root){
      return
    }

    array.push(root.value);
    preOrder(root.left)
    preOrder(root.right)
  }

  function inOrder(root: NodeTree){
    if (!root){
      return
    }

    inOrder(root.left)
    array.push(root.value);
    inOrder(root.right)
  }

  function postOrder(root: NodeTree){
    if (!root){
      return
    }

    postOrder(root.left);
    postOrder(root.right);
    array.push(root.value);
  }

  function handleButtonClick(msgTitle: string, callback: (tree: NodeTree) => void){
    array = [];
    callback(tree)

    const stringfyArray = array.join(', ')
    const msg: msgData = {title: msgTitle, body: stringfyArray}

    setHistory((history) => [...history, msg])
  }

  function handleButtonBFS(){
    const BFSlist = BFS(tree)
    const stringfy  = BFSlist.map(node => node.value).join(', ')

    const msg: msgData = {title: "Em largura:", body: stringfy}

    setHistory((history) => [...history, msg])
  }

  return (
    <ContextTree.Provider value={{
      numberOfNodes,
      treeRawNodeDatum,
      tree,
      history,
      createNewTree,
      preOrder,
      inOrder,
      postOrder,
      handleButtonClick,
      handleButtonBFS,
    }}>
      {children}
    </ContextTree.Provider>
  )
}
