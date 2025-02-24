import React, { useState } from 'react';
import { ButtonContent, Button, Icon, Modal, Input, Dropdown } from 'semantic-ui-react';

import '../css/estilos-home.css';
import '../css/estilos-basicos.css';

const Evento = () => {
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState('');
  const [editando, setEditando] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState('');
  const [error, setError] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [minutos, setMinutos] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  const horasOptions = Array.from({ length: 24 }, (_, i) => ({
    key: i,
    text: `${i.toString().padStart(2, '0')}:00`,
    value: i.toString().padStart(2, '0'),
  }));

  const minutosOptions = Array.from({ length: 60 }, (_, i) => ({
    key: i,
    text: i.toString().padStart(2, '0'),
    value: i.toString().padStart(2, '0'),
  }));

  const validarTexto = (texto) => {
    if (!texto.trim()) {
      return '⚠️ El evento no puede estar vacío';
    }
    if (texto.length > 50) {
      return '⚠️ El evento no puede tener más de 50 caracteres';
    }
    return '';
  };

  const validarFecha = (fechaSeleccionada) => {
    if (fechaSeleccionada < today) {
      return '⚠️ No puedes seleccionar una fecha pasada';
    }
    if (fechaSeleccionada > maxDateFormatted) {
      return '⚠️ No puedes seleccionar una fecha mayor a 2 años';
    }
    return '';
  };

  const handleAbrirModal = () => {
    const mensajeError = validarTexto(evento);
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    setError('');
    setModalOpen(true);
    setNuevoEvento(evento); 
    setFecha('');
    setHora('');
    setMinutos('');
  };

  const handleAgregarConfirmado = () => {
    const mensajeError = validarTexto(evento) || validarFecha(fecha);
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    if (!hora || !minutos) {
      setError('⚠️ Debes seleccionar una hora y minutos');
      return;
    }
    const nuevoEvento = `${evento} - ${fecha} ${hora}:${minutos}`;
    setEventos([...eventos, nuevoEvento]);
    setEvento('');
    setFecha('');
    setHora('');
    setMinutos('');
    setError('');
    setModalOpen(false);
  };

  const handleModificar = (index) => {
    setEditando(index);
    const [eventoTexto, eventoFechaHora] = eventos[index].split(' - ');
    const [eventoFecha, eventoHoraMinutos] = eventoFechaHora.split(' '); 
    const [eventoHora, eventoMinutos] = eventoHoraMinutos.split(':');
    setNuevoEvento(eventoTexto);
    setFecha(eventoFecha || ''); 
    setHora(eventoHora || '');   
    setMinutos(eventoMinutos || '');   
    setModalOpen(true);
  };

  const handleGuardar = (index) => {
    const mensajeError = validarTexto(nuevoEvento) || validarFecha(fecha);
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    if (!hora || !minutos) {
      setError('⚠️ Debes seleccionar una hora y minutos');
      return;
    }
    const eventosActualizados = [...eventos];
    eventosActualizados[index] = `${nuevoEvento} - ${fecha} ${hora}:${minutos}`;
    setEventos(eventosActualizados);
    setEditando(null);
    setNuevoEvento('');
    setFecha('');
    setHora('');
    setMinutos('');
    setError('');
    setModalOpen(false);
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
        <Button animated='fade' onClick={handleAbrirModal} color="green" size="large">
          <ButtonContent visible><Icon name='plus circle' /></ButtonContent>
          <ButtonContent hidden>Agregar</ButtonContent>
        </Button>
        {error && <p className="error-text">{error}</p>}
      </div>

      <ul className="eventos-list">
        {eventos.map((evento, index) => (
          <li key={index} className="evento-item">
            <span className="evento-text">{evento}</span>
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size='small'>
        <Modal.Header>{editando !== null ? 'Modificar Evento' : 'Agregar Evento'}</Modal.Header>
        <Modal.Content>
          <Input type="text" value={nuevoEvento} onChange={(e) => setNuevoEvento(e.target.value)} fluid style={{ marginBottom: '10px' }} placeholder="Descripción del evento" />
          <Input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            min={today} 
            max={maxDateFormatted} 
            fluid 
            style={{ marginBottom: '10px' }} 
          />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Dropdown
              placeholder="Hora"
              selection
              options={horasOptions}
              value={hora}
              onChange={(e, { value }) => setHora(value)}
            />
            <Dropdown
              placeholder="Minutos"
              selection
              options={minutosOptions}
              value={minutos}
              onChange={(e, { value }) => setMinutos(value)}
            />
          </div>
          {error && <p className="error-text" style={{ marginTop: '10px', textAlign: 'center' }}>{error}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button color='green' onClick={editando !== null ? () => handleGuardar(editando) : handleAgregarConfirmado}>Confirmar</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Evento;
