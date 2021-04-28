import styles from './styles.module.css'
export default function Header() {
    return (
        <div>
            <header className={styles.headerContainer}>
            <a href="/">
                <img className={styles.img} src="/logo.png" alt="BinaryTree"/>
            </a>
        </header>
        </div>
        
        
    )
}
