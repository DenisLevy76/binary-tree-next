import React from "react"
import styles from "./styles.module.css"

interface People {
  name: string
  image: string
  role: string
  socialMedia: string[]
}

interface StaffComponentProps {
  peoples: People[]
}

export default function StaffComponent({ peoples }: StaffComponentProps) {
  return (
    <ul className={styles.ulContent}>
      {peoples.map((people: People, index: number) => {
        return (
          <li className={styles.staffContent} key={index}>
            <img className={styles.imgStaff} src={people.image} alt="" />
            <div className={styles.divContent}>
              <h3>{people.name}</h3>
              <p className={styles.p}>{people.role}</p>
              {people.socialMedia.map((link, index) => (
                <a className={styles.a} key={index} href={link}>
                  {link.slice(8, link.length)}
                </a>
              ))}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
