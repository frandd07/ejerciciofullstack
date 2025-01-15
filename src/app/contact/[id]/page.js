"use client"

import { useEffect, useState } from "react"
import { use } from "react"

export default function Contact({params}) {
    const {id} = use(params)
    const [contacto,setContacto] = useState([])
    const [isEditing,setIsEditing] = useState(false)

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [numTelefono, setNumTelefono] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
  
    async function actualizarContacto(e) {
        e.preventDefault();

        const response = await fetch ("/api/contact", {
            method: 'PUT',
            headers: {'content-Type': 'application.json'},
            body: JSON.stringify({
                id: id,
                update: {
                    nombre: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    num_telefono: numTelefono,
                    fecha_nacimiento: fechaNacimiento
                }
            })
        })

        setIsEditing(false)
        fetchContact()
    }

    async function fetchContact(){
        const url = "/api/contact/contactuser?id=" +id
        const response = await fetch(url)
        const cont = await response.json()
        setNombre(cont.nombre)
        setApellidos(cont.apellidos)
        setCorreo(cont.correo)
        setNumTelefono(cont.num_telefono)
        setFechaNacimiento(cont.fecha_nacimiento)

        setContacto(cont)
    }

    useEffect(() => {
        fetchContact()
    },[])


if(contacto && !isEditing){
    return(
        <div>
            <h1>{contacto.nombre}</h1>
            <h2>{contacto.apellidos}</h2>
            <p>{contacto.correo}</p>
            <p>{contacto.num_telefono}</p>
            <p>{contacto.fecha_nacimiento}</p>
            <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
)}else if(contacto && isEditing){
   return( <form onSubmit={actualizarContacto}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Apellidos:
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Correo:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Número de teléfono:
          <input
            type="text"
            value={numTelefono}
            onChange={(e) => setNumTelefono(e.target.value)}
            required
            pattern="[0-9]{9}"
          />
        </label>
        <br />
        <label>
          Fecha nacimiento:
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Crear" />
      </form>)
}else{
    return (<p>Not found</p>)
}
   

}