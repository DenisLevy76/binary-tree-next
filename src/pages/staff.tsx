import Header from '../components/Header'
import React from 'react'
import styles from '../styles/staff.module.css'
import StaffComponent from '../components/StaffComponent'
interface People{
    name : string;
    image : string;
    role : string;
    socialMedia : string;
}

export default function staff() {
    const peoples : People[] = [{
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
        role : "Design Gráfico",
        socialMedia : "https://www.instagram.com/luh_naluna16/"
    }]

    return (
        <div className={styles.container}>
            <StaffComponent peoples={peoples}/>

        </div>
    )
}
