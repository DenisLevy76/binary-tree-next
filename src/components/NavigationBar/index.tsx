import styles from './styles.module.css'

export default function NagivationBar() {
    return (
        <div className={styles.NavContainer}>
            <img className={styles.imgHome}src="/home.png" alt="Home"/>
            <p>Home</p>
            <div className={styles.separate}>
                <img className={styles.imgStaff}src="/staff.png" alt="Staff"/>
                <a className={styles.Center}>Staff</a>
            </div>
            
        </div>
    )
}
