import Header from '../components/Header'
import React from 'react'
import styles from '../styles/staff.module.css'
import StaffComponent from '../components/StaffComponent'
interface Pessoa{
    name : string;
    image : string;
    role : string;
    socialMedia : string;
}

export default function staff() {
    const pessoas : Pessoa[] = [{
        name : "Michel Ribeiro",
        image : "https://avatars.githubusercontent.com/u/62553511?v=4",
        role : "Programador",
        socialMedia : "https://github.com/MichSide"
    },
    {
        name : "Denis Levy",
        image : "https://avatars.githubusercontent.com/u/62116847?v=4",
        role : "Programador",
        socialMedia : "https://github.com/DenisLevy76"
    },
    {
        name: "Laiça Camila",
        image : "/foto.jpg",
        role : "Design Grafico",
        socialMedia : "https://www.instagram.com/luh_naluna16/"
    }]
    return (
        <div>
            <ul className={styles.ulContent}>
            {
                pessoas.map((element : Pessoa, index : number) => {
                    return (
                        <li className={styles.staffContent} key={index}>
                            <img className={styles.imgStaff} src={element.image} alt=""/> 
                            <div className={styles.divContent}>
                                <h3>{element.name}</h3>
                                <p>{element.role}</p>
                                <a className={styles.a} href={element.socialMedia}>{element.socialMedia}</a>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
            
        </div>
    )
}
