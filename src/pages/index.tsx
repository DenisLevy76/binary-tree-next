import React, { useContext } from "react"
import Head from "next/head"
import {
  FiArrowDown,
  FiArrowUpRight,
  FiGithub,
  FiGitBranch
} from "react-icons/fi"
import { ContextTree } from "../contexts/ContextTree"
import Algorithm from "../components/Algorithm"
import History from "../components/History"
import { TreeGraph } from "../components/TreeGraph"
import styles from "../styles/Home.module.css"

export default function Home() {
  const { treeRawNodeDatum } = useContext(ContextTree)
  return (
    <>
      <Head>
        <title>Binary Tree — Entenda cada conexão</title>
        <meta
          name="description"
          content="Explore árvores binárias de forma visual e interativa. Crie uma árvore e acompanhe algoritmos de percurso, nó por nó."
        />
        <meta name="theme-color" content="#111214" />
      </Head>
      <main className={styles.frame}>
        <div className={styles.sectionStrip}>
          <span>01 / ESTRUTURAS DE DADOS</span>
          <span>VISUALIZADOR INTERATIVO · V.02</span>
        </div>
        <section className={styles.hero} aria-labelledby="hero-title">
          <span className={styles.cornerWord} aria-hidden="true">
            BINARY TREE
          </span>
          <div className={styles.symbol} aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path
                d="M32 15V27M32 27H14V41M32 27H50V41"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14 47V53H6M14 53H22M50 47V53H42M50 53H58"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect x="26" y="3" width="12" height="12" fill="#80aaff" />
              <rect
                x="8"
                y="35"
                width="12"
                height="12"
                fill="#111214"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="44"
                y="35"
                width="12"
                height="12"
                fill="#111214"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M0 63H64" stroke="#303136" />
            </svg>
          </div>
          <div className={styles.productLabel}>
            <span>01</span> Binary<span className={styles.blue}>Tree</span>
          </div>
          <h1 id="hero-title">
            Entenda a lógica.
            <br />
            Visualize cada <span>conexão.</span>
          </h1>
          <p className={styles.description}>
            Árvores binárias, sem abstração. Crie, explore e acompanhe
            <br className={styles.desktopBreak} /> cada algoritmo acontecer, um
            nó de cada vez.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#laboratorio">
              EXPLORAR ÁRVORE <FiArrowDown />
            </a>
            <a
              className={styles.secondaryAction}
              href="https://github.com/DenisLevy76/binary-tree-next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub /> VER NO GITHUB <FiArrowUpRight />
            </a>
          </div>
          <p className={styles.heroNote}>
            NO SEU NAVEGADOR <span>·</span> GRATUITO <span>·</span> CÓDIGO
            ABERTO
          </p>
          <a
            className={styles.scrollHint}
            href="#laboratorio"
            aria-label="Ir para o laboratório"
          >
            <span /> EXPERIMENTE ABAIXO <FiArrowDown />
          </a>
        </section>

        <section
          className={styles.laboratory}
          id="laboratorio"
          aria-labelledby="lab-title"
        >
          <div className={styles.labHeading}>
            <div>
              <span className={styles.eyebrow}>02 / LABORATÓRIO</span>
              <h2 id="lab-title">
                Aprenda fazendo<span>.</span>
              </h2>
            </div>
            <p>
              <span className={styles.statusDot} /> UM ESPAÇO PARA EXPERIMENTAR
            </p>
          </div>
          <div className={styles.workspace}>
            <Algorithm />
            <TreeGraph data={treeRawNodeDatum} />
            <History />
          </div>
          <div className={styles.labFooter}>
            <span>
              <FiGitBranch /> DA RAIZ ÀS FOLHAS, CADA PASSO CONTA.
            </span>
            <span>4 ALGORITMOS. INFINITAS DESCOBERTAS.</span>
          </div>
        </section>

        <section className={styles.learnNote}>
          <span className={styles.noteNumber}>[ i ]</span>
          <p>
            Pequenos nós. Grandes ideias.
            <span>
              {" "}
              Valores menores seguem à esquerda. Maiores, à direita. O resto
              você descobre explorando.
            </span>
          </p>
          <a href="#algoritmos" aria-label="Explorar algoritmos">
            <FiArrowUpRight />
          </a>
        </section>
        <footer className={styles.footer}>
          <span>BINARY TREE © {new Date().getFullYear()}</span>
          <span>FEITO PARA TORNAR O COMPLEXO VISÍVEL.</span>
          <a
            href="https://github.com/DenisLevy76/binary-tree-next"
            target="_blank"
            rel="noopener noreferrer"
          >
            CÓDIGO ABERTO <FiArrowUpRight />
          </a>
        </footer>
      </main>
      <div className={styles.ruler} aria-hidden="true">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
    </>
  )
}
