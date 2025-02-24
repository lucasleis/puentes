import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import '../css/about.css';  

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About me</h1>
        <p className="about-subtitle">A little resume.</p>
      </header>

      <div className="about-content">
        <div className="about-description">
          <p>
            I am a Software Engineer, recently graduated, with a focus on backend development. I specialize in building robust APIs and 
            microservices, utilizing both functional and object-oriented programming paradigms. My development approach is guided by solid 
            principles, ensuring scalability and maintainability in every project.
          </p>
          <p>
            My expertise includes creating, testing, and maintaining reliable software systems. I thrive in collaborative environments, 
            working closely with teams to optimize processes and drive innovation. I'm dedicated to delivering high-quality results and 
            constantly seeking opportunities to enhance system performance.
          </p>
          <p>
            As a proactive problem-solver with strong communication skills, I actively contribute to team knowledge-sharing and continuous 
            learning. Whether working on web applications, mobile apps, or backend systems, I am committed to improving my skills and 
            providing exceptional solutions to clients.
          </p>
          <p>
            I am particularly interested in remote freelancing opportunities, where I can apply and expand my programming skills to 
            develop cutting-edge internet solutions.
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
          Contact me 
          <Icon name="envelope" />
        </Button>
      </div>
    </div>
  );
};

export default About;
