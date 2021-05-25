import React from 'react'
import styles from '../styles/staff.module.css'
import StaffComponent from '../components/StaffComponent'
import Head from 'next/head'

interface People{
    name : string;
    image : string;
    role : string;
    socialMedia : string[];
}

export default function staff() {
    const peoples : People[] = [{
        name : "Michel Ribeiro",
        image : "https://avatars.githubusercontent.com/u/62553511?v=4",
        role : "Programmer",
        socialMedia : ["https://github.com/MichelRibeiro48"]
    },
    {
        name : "Denis Levy",
        image : "https://avatars.githubusercontent.com/u/62116847?v=4",
        role : "Programmer",
        socialMedia : ["https://github.com/DenisLevy76", "https://linkedin.com/in/d%C3%AAnis-levy-b34a951a5"]
    },
    {
        name: "Laíça Camila",
        image : "/foto.jpg",
        role : "Graphic Design",
        socialMedia : ["https://instagram.com/luh_naluna16"]
    }]

    return (
        <div className={styles.container}>
          <Head>
            <title>Binary Tree | Staff</title>
          </Head>
          <StaffComponent peoples={peoples}/>
        </div>
    )
}
