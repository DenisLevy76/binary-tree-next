import React, { useContext } from "react"
import styles from "../styles/Home.module.css"
import Buttons from "../components/Buttons"
import History from "../components/History"
import Head from "next/head"
import { TreeGraph } from "../components/TreeGraph"
import { ContextTree } from "../contexts/ContextTree"

export default function Home() {
  const {
    treeRawNodeDatum,
  } = useContext(ContextTree)

  return (
    <div className={styles.containerIndex}>
      <Head>
        <title>Binary Tree | Home</title>
      </Head>
      <Buttons />
      <TreeGraph data={treeRawNodeDatum} />
      <History />
    </div>
  )
}
