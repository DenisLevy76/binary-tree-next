import styles from './styles.module.css'

export default function NagivationBar() {
    return (
        <div className={styles.NavContainer}>
          <a href="/">
              <div className={styles.rectangle}>
                  <img className={styles.imgHome}src="/home.png" alt="Home"/>
                  <a className={styles.home}>Home</a>
              </div>
          </a>
          <a href="/staff">
              <div className={styles.separate}>
                  <div className={styles.rectangle}>
                      <img className={styles.imgStaff}src="/staff.png" alt="Staff"/>
                      <a>Staff</a>
                  </div>
              </div>
          </a>  
        </div>
    )
}
