import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  FiMaximize2,
  FiMinus,
  FiPlus,
  FiCrosshair,
  FiMousePointer,
  FiX,
  FiMove
} from "react-icons/fi"
import { ContextTree, RawNodeDatum } from "../../contexts/ContextTree"
import { NodeTree } from "../../utils/tree"
import styles from "./styles.module.css"
import { MAX_ZOOM, MIN_ZOOM } from "../../utils/treeViewport"
import { useTreeViewport } from "./useTreeViewport"

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
      x: 70 + index++ * 44,
      y: 72 + depth * 112,
      depth,
      parent
    })
    visit(node.right, depth + 1, node.value)
  }
  visit(tree, 0, null)
  const width = Math.max(360, (nodes.length - 1) * 44 + 140)
  const offset = (width - ((nodes.length - 1) * 44 + 140)) / 2
  nodes.forEach(node => {
    node.x += offset
  })
  return {
    nodes,
    width,
    height: Math.max(220, (tree.getHeight() - 1) * 112 + 144)
  }
}

export const TreeGraph = ({ data }: TreeGraphProps) => {
  const { tree, traversal, activeStep, isRunning } = useContext(ContextTree)
  const layout = useMemo(() => positionTree(tree), [tree])
  const [fullscreen, setFullscreen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const panel = useRef<HTMLElement>(null)
  const {
    stage,
    size,
    viewport,
    dragging,
    resetView,
    changeZoom,
    interactions
  } = useTreeViewport(layout, value =>
    setSelectedNode(previous => (previous === value ? null : value))
  )
  const completed = traversal.slice(0, activeStep + 1)
  const current = traversal[activeStep]
  const byValue = new Map(layout.nodes.map(node => [node.value, node]))

  useEffect(() => {
    setSelectedNode(null)
  }, [tree, traversal])

  useEffect(() => {
    const onFullscreenChange = () =>
      setFullscreen(document.fullscreenElement === panel.current)
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

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
        aria-label="Área da árvore. Arraste para mover, use a roda do mouse ou mais e menos para zoom. Duplo clique ou zero para enquadrar."
        {...interactions}
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
            viewBox={`0 0 ${size.width} ${size.height}`}
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
              transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}
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
                      d={`M ${parent.x} ${parent.y + 26} V ${parent.y + 48} Q ${
                        parent.x
                      } ${parent.y + 56}, ${
                        parent.x + (node.x > parent.x ? 8 : -8)
                      } ${parent.y + 56} H ${
                        node.x + (node.x > parent.x ? -8 : 8)
                      } Q ${node.x} ${parent.y + 56}, ${node.x} ${
                        parent.y + 64
                      } V ${node.y - 26}`}
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
                      y="-40"
                      textAnchor="middle"
                    >
                      RAIZ
                    </text>
                  )}
                  <circle r="26" />
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
            onClick={() => changeZoom(1 / 1.25)}
            disabled={viewport.scale <= MIN_ZOOM}
            aria-label="Diminuir zoom"
            title="Diminuir zoom"
          >
            <FiMinus />
          </button>
          <span>{Math.round(viewport.scale * 100)}%</span>
          <button
            type="button"
            onClick={() => changeZoom(1.25)}
            disabled={viewport.scale >= MAX_ZOOM}
            aria-label="Aumentar zoom"
            title="Aumentar zoom"
          >
            <FiPlus />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Centralizar árvore"
            title="Enquadrar árvore (0 ou duplo clique)"
          >
            <FiCrosshair />
          </button>
        </div>
        <span className={styles.dragHint}>
          <span>
            <FiMove /> Arraste para mover
          </span>
          <span>
            <FiMousePointer /> Role para ampliar
          </span>
          <span>Duplo clique para enquadrar</span>
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
