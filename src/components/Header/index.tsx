import Link from "next/link"
import { FiArrowUpRight, FiGitBranch, FiGithub } from "react-icons/fi"
import NavigationBar from "../NavigationBar"
import styles from "./styles.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.brand} aria-label="Binary Tree — início">
          <FiGitBranch aria-hidden="true" />
          <span>
            binary<span className={styles.brandLight}>tree</span>
            <span className={styles.period}>.</span>
          </span>
        </a>
      </Link>
      <NavigationBar />
      <span className={styles.openSource}>
        <span /> OPEN SOURCE
      </span>
      <div className={styles.actions}>
        <a
          href="https://github.com/DenisLevy76/binary-tree-next"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
          aria-label="Ver código no GitHub (abre em nova aba)"
        >
          <FiGithub />
        </a>
        <Link href="/#laboratorio">
          <a className={styles.launch}>
            ABRIR LABORATÓRIO <FiArrowUpRight />
          </a>
        </Link>
      </div>
    </header>
  )
}
