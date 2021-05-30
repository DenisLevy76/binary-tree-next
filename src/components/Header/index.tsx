import styles from "./styles.module.css"
import Link from "next/link"

export default function Header() {
  return (
    <div>
      <header className={styles.headerContainer}>
        <Link href="/">
          <a>
            <img className={styles.img} src="/logo.png" alt="Binary Tree" />
          </a>
        </Link>
        <a
          href="https://github.com/DenisLevy76/binary-tree-next"
          target="_blank"
        >
          <img
            src="/GitHub-Mark-Light-120px-plus.png"
            className={styles.github}
            alt="Github"
          />
        </a>
      </header>
    </div>
  )
}
