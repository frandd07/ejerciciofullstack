import { useEffect, useState } from 'react';

const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch('/api/contactos');
      const data = await res.json();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  
  return (
    <div>
      <h1>Agenda de Contactos</h1>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              <span>{contact.nombre} {contact.apellidos}</span>
            </li>
          ))
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
