import React from 'react'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('../components/Canvas').then((mod) => mod.Canvas), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello, Binary Tree</h1>
      <Canvas />
    </div>
  );
}
