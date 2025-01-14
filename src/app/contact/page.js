"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ListContact(){

    const[contacts, setContacts] = useState([])

    async function fetchContacts(){
        const response = await fetch("/api/contact")
        const body = await response.json()
        setContacts(body)
    }

    useEffect(() => {
        fetchContacts()
    },[])

    async function deleteContact(deleteID){
        
            if(window.confirm("¿Seguro que quieres eliminarlo permanentemente?")){
                const response = await fetch("/api/contact", {
                    method: 'DELETE',
                    headers: {"Content-Type":"application-json"},
                    body: JSON.stringify({id: deleteID})
                })

                fetchContacts()
            }
        
      
        

    }

    return(
        <div>
            <h1>Lista de contactos</h1>
            {contacts.map(contact => 
            <p key={contact.id}>
            <Link  href={"/contact/" + contact.id}>{contact.nombre} {contact.apellidos} </Link>
            <button onClick={() => deleteContact(contact.id)}>Eliminar</button>
            </p>
            
            
            )}

            <Link href={"/contact/create"}>Agregar contacto</Link>
        </div>
    )
}