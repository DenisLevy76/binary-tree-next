import React from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Buttons from '../components/Buttons';
import History from '../components/History';
import Head from 'next/head'

const TreeGraph = dynamic(() => import('../components/TreeGraph').then((mod) => mod.TreeGraph), {ssr: false})

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
  );
}
