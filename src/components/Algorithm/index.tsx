import React, { useContext, useState } from "react"
import { FiArrowRight, FiPlay, FiRefreshCw } from "react-icons/fi"
import { ContextTree, Traversal } from "../../contexts/ContextTree"
import styles from "./styles.module.css"

const algorithms: {
  key: Traversal
  title: string
  description: string
  number: string
}[] = [
  {
    key: "preOrder",
    title: "Pré-ordem",
    description: "Raiz → Esquerda → Direita",
    number: "01"
  },
  {
    key: "inOrder",
    title: "Em ordem",
    description: "Esquerda → Raiz → Direita",
    number: "02"
  },
  {
    key: "postOrder",
    title: "Pós-ordem",
    description: "Esquerda → Direita → Raiz",
    number: "03"
  },
  {
    key: "BFS",
    title: "Busca em largura",
    description: "Nível por nível",
    number: "04"
  }
]

export default function Algorithm() {
  const {
    createNewTree,
    handleButtonClick,
    isRunning,
    speed,
    setSpeed
  } = useContext(ContextTree)
  const [count, setCount] = useState("15")
  const [selected, setSelected] = useState<Traversal>("preOrder")
  const algorithm = algorithms.find(item => item.key === selected)
  const valid =
    Number.isInteger(Number(count)) && Number(count) >= 1 && Number(count) <= 63
  return (
    <aside className={styles.panel} aria-label="Controles da árvore">
      <div className={styles.panelHeader}>
        <span>CONTROLES</span>
        <span className={styles.panelNumber}>01</span>
      </div>
      <div className={styles.content}>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (valid) createNewTree(Number(count))
          }}
        >
          <label className={styles.label} htmlFor="node-count">
            Número de nós
          </label>
          <div className={styles.inputRow}>
            <input
              id="node-count"
              type="number"
              min="1"
              max="63"
              step="1"
              value={count}
              onChange={event => setCount(event.target.value)}
              aria-describedby="node-hint"
              required
            />
            <button
              type="submit"
              disabled={!valid}
              title="Gerar nova árvore"
              aria-label="Gerar nova árvore"
            >
              <FiRefreshCw />
            </button>
          </div>
          <p id="node-hint" className={valid ? styles.hint : styles.error}>
            {valid
              ? "De 1 a 63 nós, gerados aleatoriamente."
              : "Digite um número inteiro de 1 a 63."}
          </p>
        </form>
        <div className={styles.algorithmHeading} id="algoritmos">
          <span>ALGORITMO DE PERCURSO</span>
          <FiArrowRight />
        </div>
        <div
          className={styles.algorithmList}
          role="group"
          aria-label="Escolha o algoritmo"
        >
          {algorithms.map(item => (
            <button
              type="button"
              className={
                selected === item.key ? styles.selected : styles.algorithm
              }
              aria-pressed={selected === item.key}
              key={item.key}
              onClick={() => setSelected(item.key)}
            >
              <span className={styles.radio} aria-hidden="true" />
              <span className={styles.algorithmText}>
                <span>{item.title}</span>
                <small>{item.description}</small>
              </span>
              <span className={styles.algorithmNumber}>{item.number}</span>
            </button>
          ))}
        </div>
        <div className={styles.speedControl}>
          <label htmlFor="speed">Velocidade</label>
          <select
            id="speed"
            value={speed}
            onChange={event => setSpeed(Number(event.target.value))}
          >
            <option value={1100}>Lenta</option>
            <option value={600}>Normal</option>
            <option value={200}>Rápida</option>
          </select>
        </div>
        <button
          type="button"
          className={styles.runButton}
          disabled={isRunning}
          onClick={() => handleButtonClick(algorithm.title, selected)}
        >
          <FiPlay />
          {isRunning ? "PERCORRENDO..." : "INICIAR PERCURSO"}
          <FiArrowRight />
        </button>
      </div>
    </aside>
  )
}
