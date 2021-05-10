import styles from './styles.module.css'
import Link from 'next/link'

export default function NagivationBar() {
    return (
        <nav className={styles.NavContainer}>
          <Link href="/">
            <a className={styles.home} style={{color:"white"}}><img className={styles.imgHome} style={{marginRight:"0.4rem"}}src="/home.svg" alt="Home"/>Home</a>
          </Link>
          <Link href="/staff">
            <a className={styles.home} style={{color:"white"}}><img className={styles.imgStaff} style={{marginRight:"0.5rem"}} src="/staff.svg" alt="Staff"/>Staff</a>
          </Link>
        </nav>
    )
}
