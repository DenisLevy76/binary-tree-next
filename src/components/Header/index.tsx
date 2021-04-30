import styles from './styles.module.css'
import Link from 'next/link'
export default function Header() {
    return (
        <div>
            <header className={styles.headerContainer}>
            <Link href="/">
              <a>
                  <img className={styles.img} src="/logo.png" alt="BinaryTree"/>
              </a>
            </Link>
        </header>
        </div>


    )
}
