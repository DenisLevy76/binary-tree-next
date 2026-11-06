import React, { useContext } from "react"
import Head from "next/head"
import { FiArrowUpRight, FiGithub, FiGitBranch } from "react-icons/fi"
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
          <div>
            <div className={styles.productLabel}>
              <span>01</span> Binary<span className={styles.blue}>Tree</span>
            </div>
            <h1 id="hero-title">
              Explore cada <span>conexão.</span>
            </h1>
          </div>
          <div className={styles.heroAside}>
            <p className={styles.description}>
              Crie uma árvore, escolha um percurso e acompanhe a lógica
              acontecer, um nó de cada vez.
            </p>
            <a
              className={styles.sourceLink}
              href="https://github.com/DenisLevy76/binary-tree-next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub /> CÓDIGO ABERTO <FiArrowUpRight />
            </a>
          </div>
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
              <span className={styles.statusDot} /> ARRASTE. APROXIME. EXPLORE.
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
