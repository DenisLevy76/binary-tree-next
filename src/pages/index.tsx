import React from "react"
import styles from "../styles/Home.module.css"
import Buttons from "../components/Buttons"
import History from "../components/History"
import Head from "next/head"
import { TreeGraph } from "../components/TreeGraph"

export default function Home() {
  return (
    <div className={styles.containerIndex}>
      <Head>
        <title>Binary Tree | Home</title>
      </Head>
      <Buttons />
      <TreeGraph />
      <History />
    </div>
  )
}
