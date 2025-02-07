import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import '../css/about.css';  // Asegúrate de tener el archivo CSS para los estilos

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Sobre Nosotros</h1>
        <p className="about-subtitle">Conoce más sobre nuestra aplicación y misión.</p>
      </header>

      <div className="about-content">
        <div className="about-description">
          <p>
            Nuestra aplicación fue creada para ayudar a usuarios de todo el mundo a gestionar eventos y actividades
            de manera eficiente. Con nuestra plataforma, puedes agregar, modificar y eliminar eventos de forma rápida,
            todo en un solo lugar. ¡Tu organización y productividad mejorarán enormemente!
          </p>
          <p>
            Nos enorgullece ofrecer una herramienta fácil de usar, con un diseño intuitivo y flexible que se adapta a tus necesidades.
          </p>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <Icon name="calendar" size="huge" />
            <h3>Gestión de Eventos</h3>
            <p>Agrega, modifica y elimina tus eventos fácilmente.</p>
          </div>
          <div className="feature-card">
            <Icon name="settings" size="huge" />
            <h3>Personalización</h3>
            <p>Adapta la aplicación a tus preferencias.</p>
          </div>
          <div className="feature-card">
            <Icon name="users" size="huge" />
            <h3>Colaboración</h3>
            <p>Comparte tus eventos con otros usuarios.</p>
          </div>
        </div>
      </div>

      <div className="about-footer">
        <Button primary size="large">
          Contáctanos
          <Icon name="envelope" />
        </Button>
      </div>
    </div>
  );
};

export default About;
