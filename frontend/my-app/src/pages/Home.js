import React, { useState } from 'react';
import { ButtonContent, Button, Icon } from 'semantic-ui-react';

import '../css/estilos-home.css'; // para trabajar en local
import '../css/estilos-basicos.css'; // para trabajar en local

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState('');
  const [editando, setEditando] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState('');
  const [error, setError] = useState('');

  const validarTexto = (texto) => {
    if (!texto.trim()) {
      return '⚠️ El evento no puede estar vacío';
    }
    if (texto.length > 50) {
      return '⚠️ El evento no puede tener más de 50 caracteres';
    }
    return '';
  };

  const handleAgregar = () => {
    const mensajeError = validarTexto(evento);
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    setEventos([...eventos, evento]);
    setEvento('');
    setError('');
  };

  const handleModificar = (index) => {
    setEditando(index);
    setNuevoEvento(eventos[index]);
    setError('');
  };

  const handleGuardar = (index) => {
    const mensajeError = validarTexto(nuevoEvento);
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    const eventosActualizados = [...eventos];
    eventosActualizados[index] = nuevoEvento;
    setEventos(eventosActualizados);
    setEditando(null);
    setNuevoEvento('');
    setError('');
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
        <Button animated='fade' onClick={handleAgregar} color="green" size="large">
          <ButtonContent visible><Icon name='plus circle' /></ButtonContent>
          <ButtonContent hidden>Agregar</ButtonContent>
        </Button>
        {error && <p className="error-text">{error}</p>}
      </div>

      <ul className="eventos-list">
        {eventos.map((evento, index) => (
          <li key={index} className="evento-item">
            {editando === index ? (
              <div>
                <input className="input" type="text" value={nuevoEvento} onChange={(e) => setNuevoEvento(e.target.value)} style={{ marginBottom: '10px' }} />
                <div className="button-group" style={{ marginBottom: '10px' }}>
                  <Button className="button-guardar" animated='fade' onClick={() => handleGuardar(index)} color="blue" size="large" fluid>
                    <ButtonContent visible><Icon name='check circle' /></ButtonContent>
                    <ButtonContent hidden>Guardar</ButtonContent>
                  </Button>
                </div>
                {error && <p className="error-text">{error}</p>}
              </div>
            ) : (
              <span className="evento-text">{evento}</span>
            )}

            <div className="button-group">
              <Button className="button-modificar" animated='fade' onClick={() => handleModificar(index)} color="yellow" size="large" fluid>
                <ButtonContent visible><Icon name='pencil alternate' /></ButtonContent>
                <ButtonContent hidden>Modificar</ButtonContent>
              </Button>
              <Button className="button-eliminar" animated='fade' color="red" onClick={() => handleEliminar(index)} size="large" fluid>
                <ButtonContent visible><Icon name='trash alternate' /></ButtonContent>
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
