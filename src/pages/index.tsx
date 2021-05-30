import React, { useContext } from "react"
import styles from "../styles/Home.module.css"
import dynamic from "next/dynamic"
import Buttons from "../components/Buttons"
import History from "../components/History"
import Head from "next/head"
import ReactModal from 'react-modal'
import { ContextTree } from "../contexts/ContextTree"


const TreeGraph = dynamic(
  () => import("../components/TreeGraph").then(mod => mod.TreeGraph),
  { ssr: false }
)

export default function Home() {
  const { handleModalClose, setHandleModalClose } = useContext(ContextTree)

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
