import React from 'react'
import {Canvas} from '../components/Canvas'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello, Binary Tree</h1>
      <Canvas />
    </div>
  );
}
