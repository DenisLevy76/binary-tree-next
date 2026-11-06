import React from "react"
import {
  FiArrowUpRight,
  FiGithub,
  FiInstagram,
  FiLinkedin
} from "react-icons/fi"
import styles from "./styles.module.css"

interface People {
  name: string
  image: string
  role: string
  socialMedia: string[]
}

function socialLink(url: string) {
  if (url.includes("github.com")) return { title: "GitHub", icon: <FiGithub /> }
  if (url.includes("linkedin.com"))
    return { title: "LinkedIn", icon: <FiLinkedin /> }
  return { title: "Instagram", icon: <FiInstagram /> }
}

export default function StaffComponent({ peoples }: { peoples: People[] }) {
  return (
    <ul className={styles.team}>
      {peoples.map((person, index) => (
        <li className={styles.person} key={person.name}>
          <div className={styles.personMeta}>
            <span>{String(index + 1).padStart(2, "0")} / COLABORADOR</span>
            <span className={styles.dot} />
          </div>
          <div className={styles.portrait}>
            <img
              src={person.image}
              alt={person.name}
              width="320"
              height="320"
            />
          </div>
          <h2>{person.name}</h2>
          <p>{person.role}</p>
          <div className={styles.links}>
            {person.socialMedia.map(url => {
              const social = socialLink(url)
              return (
                <a
                  href={url}
                  key={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.title} de ${person.name} (abre em nova aba)`}
                >
                  {social.icon}
                  {social.title}
                  <FiArrowUpRight />
                </a>
              )
            })}
          </div>
        </li>
      ))}
    </ul>
  )
}
