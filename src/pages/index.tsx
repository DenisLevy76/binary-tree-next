import React, { useContext } from "react"
import styles from "../styles/Home.module.css"
import Buttons from "../components/Buttons"
import History from "../components/History"
import Head from "next/head"
import ReactModal from 'react-modal'
import { ContextTree } from "../contexts/ContextTree"
import { TreeGraph } from "../components/TreeGraph"

export default function Home() {
  const { handleModalClose } = useContext(ContextTree)

  return (
    <div className={styles.containerIndex}>
      <ReactModal
        style={{content: {overflow: 'hidden'}}}
        isOpen={handleModalClose}
        ariaHideApp={false}
      >
        <TreeGraph modal={true}/>
      </ReactModal>
      <Head>
        <title>Binary Tree | Home</title>
      </Head>
      <Buttons />
      <TreeGraph />
      <History />
    </div>
  )
}
