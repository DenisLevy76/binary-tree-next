import React from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const TreeGraph = dynamic(() => import('../components/TreeGraph').then((mod) => mod.TreeGraph), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello, Binary Tree</h1>
      <TreeGraph />
    </div>
  );
}
