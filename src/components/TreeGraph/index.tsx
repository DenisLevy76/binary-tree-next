import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  FiMaximize2,
  FiMinus,
  FiPlus,
  FiRotateCcw,
  FiX,
  FiMove
} from "react-icons/fi"
import { ContextTree, RawNodeDatum } from "../../contexts/ContextTree"
import { NodeTree } from "../../utils/tree"
import styles from "./styles.module.css"

interface TreeGraphProps {
  data: RawNodeDatum
}
interface PositionedNode {
  value: number
  x: number
  y: number
  depth: number
  parent: number | null
}

function positionTree(tree: NodeTree) {
  const nodes: PositionedNode[] = []
  let index = 0
  function visit(node: NodeTree, depth: number, parent: number | null) {
    if (!node) return
    visit(node.left, depth + 1, node.value)
    nodes.push({
      value: node.value,
      x: 42 + index++ * 47,
      y: 52 + depth * 82,
      depth,
      parent
    })
    visit(node.right, depth + 1, node.value)
  }
  visit(tree, 0, null)
  const width = Math.max(420, (nodes.length - 1) * 47 + 84)
  const offset = (width - ((nodes.length - 1) * 47 + 84)) / 2
  nodes.forEach(node => {
    node.x += offset
  })
  return {
    nodes,
    width,
    height: Math.max(330, (tree.getHeight() - 1) * 82 + 104)
  }
}

export const TreeGraph = ({ data }: TreeGraphProps) => {
  const { tree, traversal, activeStep, isRunning } = useContext(ContextTree)
  const layout = useMemo(() => positionTree(tree), [tree])
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [fullscreen, setFullscreen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const panel = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{
    x: number
    y: number
    panX: number
    panY: number
    node: number | null
  } | null>(null)
  const completed = traversal.slice(0, activeStep + 1)
  const current = traversal[activeStep]
  const byValue = new Map(layout.nodes.map(node => [node.value, node]))

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setSelectedNode(null)
  }, [tree])

  useEffect(() => {
    const onFullscreenChange = () =>
      setFullscreen(document.fullscreenElement === panel.current)
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  function resetView() {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }
  function changeZoom(amount: number) {
    setZoom(value =>
      Math.max(0.5, Math.min(2.5, Math.round((value + amount) * 100) / 100))
    )
  }
  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen()
    else if (panel.current?.requestFullscreen)
      await panel.current.requestFullscreen()
  }
  const selected = layout.nodes.find(node => node.value === selectedNode)

  return (
    <section
      className={styles.panel}
      ref={panel}
      aria-label="Visualização da árvore"
    >
      <div className={styles.panelHeader}>
        <span>ÁRVORE BINÁRIA DE BUSCA</span>
        <span className={styles.live}>
          <span />
          {isRunning ? "PERCORRENDO" : "INTERATIVO"}
        </span>
      </div>
      <div
        className={styles.stage + (dragging ? " " + styles.dragging : "")}
        ref={stage}
        tabIndex={0}
        role="group"
        aria-label="Área da árvore. Use mais e menos para zoom e as setas para mover."
        onKeyDown={event => {
          if (event.key === "+" || event.key === "=") {
            event.preventDefault()
            changeZoom(0.2)
          }
          if (event.key === "-") {
            event.preventDefault()
            changeZoom(-0.2)
          }
          if (event.key === "0") resetView()
          const offsets = {
            ArrowLeft: [30, 0],
            ArrowRight: [-30, 0],
            ArrowUp: [0, 30],
            ArrowDown: [0, -30]
          }
          if (offsets[event.key]) {
            event.preventDefault()
            const [x, y] = offsets[event.key]
            setPan(value => ({ x: value.x + x, y: value.y + y }))
          }
        }}
        onPointerDown={event => {
          if (event.button !== 0) return
          const target = (event.target as Element).closest("[data-node]")
          dragStart.current = {
            x: event.clientX,
            y: event.clientY,
            panX: pan.x,
            panY: pan.y,
            node: target ? Number(target.getAttribute("data-node")) : null
          }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={event => {
          if (!dragStart.current || !stage.current) return
          const dx = event.clientX - dragStart.current.x
          const dy = event.clientY - dragStart.current.y
          if (Math.abs(dx) + Math.abs(dy) > 4) setDragging(true)
          const scale = Math.max(
            layout.width / stage.current.clientWidth,
            layout.height / stage.current.clientHeight
          )
          setPan({
            x: dragStart.current.panX + dx * scale,
            y: dragStart.current.panY + dy * scale
          })
        }}
        onPointerUp={event => {
          if (
            dragStart.current &&
            Math.abs(event.clientX - dragStart.current.x) +
              Math.abs(event.clientY - dragStart.current.y) <
              5 &&
            dragStart.current.node !== null
          ) {
            const value = dragStart.current.node
            setSelectedNode(previous => (previous === value ? null : value))
          }
          dragStart.current = null
          setDragging(false)
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={() => {
          dragStart.current = null
          setDragging(false)
        }}
      >
        <div className={styles.canvasMeta}>
          <span>
            BST / <b>{String(layout.nodes.length).padStart(2, "0")} NÓS</b>
          </span>
          <span>{tree.isBalanced() ? "BALANCEADA" : "NÃO BALANCEADA"}</span>
        </div>
        {data && (
          <svg
            className={styles.tree}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-labelledby="tree-title tree-description"
          >
            <title id="tree-title">
              Árvore binária com {layout.nodes.length} nós
            </title>
            <desc id="tree-description">
              Raiz {tree.value}. Valores em ordem: {tree.inOrder().join(", ")}.{" "}
              {tree.getHeight()} níveis.
            </desc>
            <g
              transform={`translate(${layout.width / 2 + pan.x} ${
                layout.height / 2 + pan.y
              }) scale(${zoom}) translate(${-layout.width / 2} ${
                -layout.height / 2
              })`}
            >
              {layout.nodes
                .filter(node => node.parent !== null)
                .map(node => {
                  const parent = byValue.get(node.parent)
                  const visited =
                    completed.includes(node.value) &&
                    completed.includes(parent.value)
                  return (
                    <path
                      key={`edge-${node.value}`}
                      className={visited ? styles.visitedEdge : styles.edge}
                      d={`M ${parent.x} ${parent.y + 17} V ${parent.y + 37} Q ${
                        parent.x
                      } ${parent.y + 42}, ${
                        parent.x + (node.x > parent.x ? 6 : -6)
                      } ${parent.y + 42} H ${
                        node.x + (node.x > parent.x ? -6 : 6)
                      } Q ${node.x} ${parent.y + 42}, ${node.x} ${
                        parent.y + 48
                      } V ${node.y - 17}`}
                    />
                  )
                })}
              {layout.nodes.map(node => (
                <g
                  key={node.value}
                  data-node={node.value}
                  transform={`translate(${node.x} ${node.y})`}
                  className={
                    current === node.value
                      ? styles.currentNode
                      : completed.includes(node.value)
                      ? styles.visitedNode
                      : node.parent === null
                      ? styles.rootNode
                      : styles.node
                  }
                >
                  <title>
                    Nó {node.value}, nível {node.depth + 1}
                    {node.parent !== null ? `, pai ${node.parent}` : ", raiz"}
                  </title>
                  {node.parent === null && (
                    <text
                      className={styles.rootLabel}
                      y="-30"
                      textAnchor="middle"
                    >
                      RAIZ
                    </text>
                  )}
                  <circle r="17" />
                  <text dy=".35em" textAnchor="middle">
                    {node.value}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        )}
        <span className={styles.axisMark} aria-hidden="true">
          +
        </span>
      </div>
      <div className={styles.canvasToolbar}>
        <div className={styles.zoomControls}>
          <button
            type="button"
            onClick={() => changeZoom(-0.2)}
            disabled={zoom <= 0.5}
            aria-label="Diminuir zoom"
            title="Diminuir zoom"
          >
            <FiMinus />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => changeZoom(0.2)}
            disabled={zoom >= 2.5}
            aria-label="Aumentar zoom"
            title="Aumentar zoom"
          >
            <FiPlus />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Centralizar árvore"
            title="Centralizar árvore"
          >
            <FiRotateCcw />
          </button>
        </div>
        <span className={styles.dragHint}>
          <FiMove /> ARRASTE PARA EXPLORAR
        </span>
        <button
          type="button"
          className={styles.fullscreenButton}
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Sair da tela cheia" : "Abrir em tela cheia"}
          title={fullscreen ? "Sair da tela cheia" : "Tela cheia"}
        >
          {fullscreen ? <FiX /> : <FiMaximize2 />}
        </button>
      </div>
      <div
        className={styles.traversalBar}
        aria-live="polite"
        aria-atomic="true"
      >
        {selected ? (
          <>
            <span>NÓ {selected.value}</span>
            <p>
              Nível {selected.depth + 1} ·{" "}
              {selected.parent === null
                ? "Raiz da árvore"
                : `Pai: ${selected.parent}`}
            </p>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              aria-label="Fechar detalhes do nó"
            >
              <FiX />
            </button>
          </>
        ) : traversal.length ? (
          <>
            <span>
              {isRunning ? "PERCURSO" : "CONCLUÍDO"}{" "}
              <b>
                {Math.min(activeStep + 1, traversal.length)}/{traversal.length}
              </b>
            </span>
            <p>
              {completed.join(" → ")}
              {isRunning && <span className={styles.cursor}>_</span>}
            </p>
          </>
        ) : (
          <>
            <span className={styles.legend}>
              <i />
              <b>Nó</b>
              <i />
              <b>Raiz</b>
            </span>
            <p>Escolha um algoritmo e inicie o percurso.</p>
          </>
        )}
      </div>
    </section>
  )
}
