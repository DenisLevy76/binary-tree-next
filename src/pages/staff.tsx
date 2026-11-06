import React from "react"
import Head from "next/head"
import Link from "next/link"
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi"
import StaffComponent from "../components/StaffComponent"
import styles from "../styles/staff.module.css"

const people = [
  {
    name: "Michel Ribeiro",
    image: "https://avatars.githubusercontent.com/u/62553511?v=4",
    role: "Desenvolvimento",
    socialMedia: ["https://github.com/MichelRibeiro48"]
  },
  {
    name: "Denis Levy",
    image: "https://avatars.githubusercontent.com/u/62116847?v=4",
    role: "Desenvolvimento",
    socialMedia: [
      "https://github.com/DenisLevy76",
      "https://linkedin.com/in/d%C3%AAnis-levy-b34a951a5"
    ]
  },
  {
    name: "Laíça Camila",
    image: "/foto.jpg",
    role: "Design gráfico",
    socialMedia: ["https://instagram.com/luh_naluna16"]
  }
]

export default function Staff() {
  return (
    <main className={styles.frame}>
      <Head>
        <title>Equipe — Binary Tree</title>
        <meta
          name="description"
          content="Conheça a equipe por trás do Binary Tree, um projeto criado para tornar estruturas de dados mais acessíveis."
        />
      </Head>
      <div className={styles.strip}>
        <span>03 / QUEM FAZ ACONTECER</span>
        <Link href="/">
            <FiArrowLeft /> VOLTAR AO VISUALIZADOR
          </Link>
      </div>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>PESSOAS POR TRÁS DOS NÓS</span>
        <h1>
          Conectados pela
          <br />
          vontade de <span>criar.</span>
        </h1>
        <p>
          Um projeto feito por estudantes, para quem aprende.
          <br />
          Design, código e curiosidade na mesma árvore.
        </p>
      </section>
      <div className={styles.teamLabel}>
        <span>A EQUIPE</span>
        <span>03 COLABORADORES</span>
      </div>
      <StaffComponent peoples={people} />
      <section className={styles.about}>
        <span>
          DA SALA DE AULA
          <br />
          PARA O NAVEGADOR.
        </span>
        <div>
          <h2>Conhecimento cresce quando é compartilhado.</h2>
          <p>
            O Binary Tree nasceu em uma atividade de Estrutura de Dados do 3º
            semestre da UNAMA. Uma forma de transformar teoria em algo que você
            pode ver, explorar e entender.
          </p>
          <a
            href="https://github.com/DenisLevy76/binary-tree-next"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub /> CONHEÇA O PROJETO <FiArrowUpRight />
          </a>
        </div>
      </section>
      <footer className={styles.footer}>
        <span>BINARY TREE © {new Date().getFullYear()}</span>
        <span>FEITO PARA TORNAR O COMPLEXO VISÍVEL.</span>
      </footer>
    </main>
  )
}
