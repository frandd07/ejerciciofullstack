"use client";

import { useState } from "react";

export default function CreateContact() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [numTelefono, setNumTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  async function crearContacto(e) {
    e.preventDefault();

    if (nombre !== "" && apellidos !== "" && numTelefono !== "" && correo !== "") {
      const telefonoValido = /^[0-9]{9}$/;
      const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (telefonoValido.test(numTelefono) && correoValido.test(correo)) {
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contact: {
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                num_telefono: numTelefono,
                fecha_nacimiento: fechaNacimiento,
              },
            }),
          });

          if (response.ok) {
            alert("Contacto creado exitosamente.");
            setNombre("");
            setApellidos("");
            setCorreo("");
            setNumTelefono("");
            setFechaNacimiento("");
          } else {
            alert("Hubo un error al crear el contacto.");
          }
        } catch (error) {
          console.error("Error al enviar la solicitud:", error);
          alert("Error al crear el contacto. Por favor, inténtalo de nuevo.");
        }
      } else {
        if (!telefonoValido.test(numTelefono)) alert("El número de teléfono debe tener exactamente 9 dígitos.");
        if (!correoValido.test(correo)) alert("El correo electrónico debe tener un formato válido (ejemplo: x@x.x).");
      }
    } else {
      alert("Por favor, completa todos los campos requeridos.");
    }
  }

  return (
    <div>
      <h1>Añadir contacto</h1>
      <form onSubmit={crearContacto}>
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
      </form>
    </div>
  );
}
