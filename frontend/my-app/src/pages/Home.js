import React, { useState } from 'react';
import { ButtonContent, Button, Icon } from 'semantic-ui-react'

import '../css/estilos-home.css'; // para trabajar en local
import '../css/estilos-basicos.css'; // para trabajar en local

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState('');
  const [editando, setEditando] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState('');

  const handleAgregar = () => {
    if (evento) {
      setEventos([...eventos, evento]);
      setEvento('');
    }
  };

  const handleModificar = (index) => {
    setEditando(index);
    setNuevoEvento(eventos[index]);
  };

  const handleGuardar = (index) => {
    if (nuevoEvento) {
      const eventosActualizados = [...eventos];
      eventosActualizados[index] = nuevoEvento;
      setEventos(eventosActualizados);
      setEditando(null);
      setNuevoEvento('');
    }
  };

  const handleEliminar = (index) => {
    const eventosActualizados = eventos.filter((_, i) => i !== index);
    setEventos(eventosActualizados);
  };

  return (
    <div className="container">
      <h1 className="header">Gestión de Eventos</h1>
      <div className="input-container">
        <input className="input" type="text" value={evento} onChange={(e) => setEvento(e.target.value)} placeholder="Agregar evento" />
        <Button animated='fade' onClick={handleAgregar} color="green">
          <ButtonContent visible><Icon name='add'/></ButtonContent>
          <ButtonContent hidden>Agregar</ButtonContent>
        </Button>
      </div>

      <ul className="eventos-list">
        {eventos.map((evento, index) => (
          <li key={index} className="evento-item">
            {editando === index ? (
              <div>
                <input className="input" type="text" value={nuevoEvento} onChange={(e) => setNuevoEvento(e.target.value)} />
                <div className="button-group">
                  <Button className="button-modificar" animated='fade' onClick={() => handleGuardar(index)} color="blue"  >
                    <ButtonContent visible><Icon name='save' /></ButtonContent>
                    <ButtonContent hidden>Guardar</ButtonContent>
                  </Button>
                </div>
              </div>
            ) : (
              <span className="evento-text">{evento}</span>
            )}

            <div className="button-group">
              <Button className="button-modificar" animated='fade' onClick={() => handleModificar(index)} color="orange">
                <ButtonContent visible> <Icon name='edit' /> </ButtonContent>
                <ButtonContent hidden>Modificar</ButtonContent>
              </Button>
              <Button
                className="button-eliminar"
                animated='fade'
                negative
                onClick={() => handleEliminar(index)}
              >
                <ButtonContent visible>
                  <Icon name='delete' />
                </ButtonContent>
                <ButtonContent hidden>Eliminar</ButtonContent>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
