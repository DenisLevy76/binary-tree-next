import React, { createContext, useEffect, useState } from "react"
import { randomTree } from "../utils/randomTree"
import { NodeTree } from "../utils/tree"

export interface RawNodeDatum {
  name: string
  attributes?: Record<string, string>
  children?: RawNodeDatum[]
}
export type Traversal = "preOrder" | "inOrder" | "postOrder" | "BFS"
interface HistoryEntry {
  title: string
  body: string
  kind: "tree" | "traversal"
}
interface TreeContext {
  treeRawNodeDatum: RawNodeDatum
  tree: NodeTree
  history: HistoryEntry[]
  traversal: number[]
  activeStep: number
  isRunning: boolean
  speed: number
  setSpeed: (speed: number) => void
  createNewTree: (number: number) => void
  handleButtonClick: (title: string, option: Traversal) => void
  clearHistory: () => void
}

function sampleTree() {
  const tree = new NodeTree(50)
  ;[28, 76, 16, 38, 64, 88, 9, 21, 33, 44, 58, 70, 82, 96].forEach(value =>
    tree.insert(value)
  )
  return tree
}

export const ContextTree = createContext({} as TreeContext)

export const ContextTreeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tree, setTree] = useState(sampleTree)
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      title: "Árvore de exemplo",
      body: "15 nós · 4 níveis · Balanceada",
      kind: "tree"
    }
  ])
  const [traversal, setTraversal] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(600)

  useEffect(() => {
    if (!isRunning) return
    const timer = window.setTimeout(() => {
      if (activeStep + 1 < traversal.length) setActiveStep(step => step + 1)
      else setIsRunning(false)
    }, speed)
    return () => window.clearTimeout(timer)
  }, [activeStep, isRunning, speed, traversal])

  function createNewTree(count: number) {
    if (!Number.isInteger(count) || count < 1 || count > 63) return
    const numbers = randomTree(count)
    const nextTree = new NodeTree(numbers[0])
    numbers.slice(1).forEach(value => nextTree.insert(value))
    setIsRunning(false)
    setTraversal([])
    setActiveStep(-1)
    setTree(nextTree)
    setHistory(entries => [
      ...entries,
      {
        title: "Nova árvore criada",
        body: `${count} nós · ${nextTree.getHeight()} níveis · ${
          nextTree.isBalanced() ? "Balanceada" : "Não balanceada"
        }`,
        kind: "tree"
      }
    ])
  }

  function handleButtonClick(title: string, option: Traversal) {
    const sequence = tree[option]()
    setTraversal(sequence)
    setActiveStep(0)
    setIsRunning(true)
    setHistory(entries => [
      ...entries,
      { title, body: sequence.join(" → "), kind: "traversal" }
    ])
  }

  return (
    <ContextTree.Provider
      value={{
        tree,
        treeRawNodeDatum: tree.convertToRawNodeDatum(),
        history,
        traversal,
        activeStep,
        isRunning,
        speed,
        setSpeed,
        createNewTree,
        handleButtonClick,
        clearHistory: () => setHistory([])
      }}
    >
      {children}
    </ContextTree.Provider>
  )
}
