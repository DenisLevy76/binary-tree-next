import React, { useContext } from "react"
import styles from "../styles/Home.module.css"
import History from "../components/History"
import Head from "next/head"
import { TreeGraph } from "../components/TreeGraph"
import { ContextTree } from "../contexts/ContextTree"
import Algorithm from "../components/Algorithm"

export default function Home() {
  const {
    treeRawNodeDatum,
  } = useContext(ContextTree)

  return (
    <div className={styles.containerIndex}>
      <Head>
        <title>Binary Tree | Home</title>
      </Head>
      <Algorithm />
      <TreeGraph data={treeRawNodeDatum} />
      <History />
    </div>
  )
}
