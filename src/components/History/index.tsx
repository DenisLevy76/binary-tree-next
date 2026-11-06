import React, { useContext, useEffect, useRef } from "react"
import { FiArrowUpRight, FiClock, FiGitBranch, FiTrash2 } from "react-icons/fi"
import { ContextTree } from "../../contexts/ContextTree"
import styles from "./styles.module.css"

export default function History() {
  const { history, clearHistory } = useContext(ContextTree)
  const list = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (list.current) list.current.scrollTop = list.current.scrollHeight
  }, [history])
  return (
    <aside className={styles.panel} aria-label="Histórico de operações">
      <div className={styles.panelHeader}>
        <span>
          HISTÓRICO{" "}
          <span className={styles.count}>
            {String(history.length).padStart(2, "0")}
          </span>
        </span>
        <button
          type="button"
          onClick={clearHistory}
          disabled={!history.length}
          aria-label="Limpar histórico"
          title="Limpar histórico"
        >
          <FiTrash2 />
        </button>
      </div>
      <ul
        className={styles.list}
        ref={list}
        aria-live="polite"
        aria-relevant="additions"
      >
        {history.map((entry, index) => (
          <li className={styles.entry} key={index}>
            <span className={styles.entryIcon}>
              {entry.kind === "tree" ? <FiGitBranch /> : <FiArrowUpRight />}
            </span>
            <div>
              <div className={styles.entryHeading}>
                <h3>{entry.title}</h3>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p>{entry.body}</p>
              <span className={styles.entryStatus}>
                {entry.kind === "tree"
                  ? "PRONTA PARA EXPLORAR"
                  : "PERCURSO REGISTRADO"}
              </span>
            </div>
          </li>
        ))}
        {!history.length && (
          <li className={styles.empty}>
            <FiClock />
            <p>Cada descoberta fica por aqui.</p>
            <span>Crie uma árvore ou execute um percurso para começar.</span>
          </li>
        )}
      </ul>
      <div className={styles.session}>
        <span /> SESSÃO ATUAL <FiClock />
      </div>
    </aside>
  )
}
