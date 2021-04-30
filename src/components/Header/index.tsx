import styles from './styles.module.css'
import Link from 'next/link'
export default function Header() {
    return (
        <div>
            <header className={styles.headerContainer}>
            <a href="/">
                <img className={styles.img} src="/logo.png" alt="Binary Tree"/>
            </a>
        </header>
        </div>


    )
}
