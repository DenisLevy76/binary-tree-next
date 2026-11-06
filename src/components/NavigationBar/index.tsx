import Link from "next/link"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"
import styles from "./styles.module.css"

export default function NavigationBar() {
  const { pathname } = useRouter()
  return (
    <nav className={styles.navigation} aria-label="Navegação principal">
      <Link href="/"
          className={pathname === "/" ? styles.active : ""}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          VISUALIZADOR
        </Link>
      <Link href="/#algoritmos">
          ALGORITMOS <FiArrowUpRight aria-hidden="true" />
        </Link>
      <Link href="/staff"
          className={pathname === "/staff" ? styles.active : ""}
          aria-current={pathname === "/staff" ? "page" : undefined}
        >
          EQUIPE
        </Link>
    </nav>
  )
}
