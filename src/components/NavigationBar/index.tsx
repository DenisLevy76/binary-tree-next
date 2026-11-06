import Link from "next/link"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"
import styles from "./styles.module.css"

export default function NavigationBar() {
  const { pathname } = useRouter()
  return (
    <nav className={styles.navigation} aria-label="Navegação principal">
      <Link href="/">
        <a
          className={pathname === "/" ? styles.active : ""}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          VISUALIZADOR
        </a>
      </Link>
      <Link href="/#algoritmos">
        <a>
          ALGORITMOS <FiArrowUpRight aria-hidden="true" />
        </a>
      </Link>
      <Link href="/staff">
        <a
          className={pathname === "/staff" ? styles.active : ""}
          aria-current={pathname === "/staff" ? "page" : undefined}
        >
          EQUIPE
        </a>
      </Link>
    </nav>
  )
}
