"use client"

import { useState } from "react"

export default function CreateContact(){

    const[nombre,setNombre] = useState("")
    const[apellidos,setApellidos] = useState("")
    const[correo,setCorreo] = useState("")
    const[numTelefono,setNumTelefono] = useState("")
    const[fechaNacimiento,setFechaNacimiento] = useState("")

    

    if (nombre !== "" && apellidos !== "" && telefono !== "" && correo !== "") {
        const telefonoValido = /^\d{9}$/.test(telefono); 
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    
        if (telefonoValido && correoValido) {
            async function crearContacto(e) {
                e.preventDefault();
                const response = await fetch("/api/contact", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contact: {
                            nombre: nombre,
                            apellidos: apellidos,
                            correo: correo,
                            num_telefono: telefono,
                            fecha_nacimiento: fechaNacimiento
                        }
                    })
                });
                if (response.ok) {
                    alert("Contacto creado exitosamente.");
                } else {
                    alert("Hubo un error al crear el contacto.");
                }
            }
        } else {
            if (!telefonoValido) alert("El número de teléfono debe tener exactamente 9 dígitos.");
            if (!correoValido) alert("El correo electrónico debe tener un formato válido (ejemplo: x@x.x).");
        }
    } else {
        alert("Algunos de los campos están vacíos.");
    }
    
   

    return(
        <div>
            <h1>Añadir contacto</h1>
             <form onSubmit={crearContacto}>
                <label>
                    Nombre:
                    <input type="text" onChange={(e) => setNombre(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Apellidos
                    <input type="text" onChange={(e) => setApellidos(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Correo:
                    <input type="email" onChange={(e) => setCorreo(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Número de teléfono:
                    <input type="number" onChange={(e) => setNumTelefono(e.target.value)} required pattern="[0-9]{9}"/>
                </label>
                <br/>
                <label>
                    Fecha nacimiento: 
                    <input type="date" onChange={(e) => setFechaNacimiento(e.target.value)}/>
                </label>
                <br/>
                <input type="submit" value="Crear"/>
             </form>
        </div>
    )
}