import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import '../css/estilos-home.css'; 
import '../css/landing.css';


const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">¡Bienvenido!</h1>
      <p>Explora las diferentes secciones:</p>
      <div className="menu-links">
        <Link to="/Home" className="menu-item">
          <Icon name="home" size="big" /> Inicio
        </Link>
        <Link to="/About" className="menu-item">
          <Icon name="info circle" size="big" /> Acerca de
        </Link>
        <Link to="/Loading" className="menu-item">
          <Icon name="spinner" size="big" /> Loading
        </Link>
        <Link to="/CV" className="menu-item">
          <Icon name="file alternate" size="big" /> Curriculum Vitae
        </Link>
      </div>
    </div>
  );
};

export default Landing;
