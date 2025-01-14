"use client"

import { useEffect, useState } from "react"
import { use } from "react"

export default function Contact({params}) {
    const {id} = use(params)
    const [contacto,setContacto] = useState([])

    async function fetchContact(){
        const url = "/api/contact/contactuser?id=" +id
        const response = await fetch(url)
        const cont = await response.json()

        setContacto(cont)
    }

    useEffect(() => {
        fetchContact()
    },[])

while(!contacto){
    return (<p>Espera</p>)
}
    return(
    <div>
        <h1>{contacto.nombre}</h1>
        <h2>{contacto.apellidos}</h2>
        <p>{contacto.correo}</p>
        <p>{contacto.num_telefono}</p>
        <p>{contacto.fecha_nacimiento}</p>
    </div>
)
}