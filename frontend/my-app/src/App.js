import React from 'react';
import './App.css';
import './css/estilos-home.css';
import './css/estilos-basicos.css';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Loading from './pages/Loading.js';
import CvViewer from './pages/CvViewer.js';
import Landing from './pages/Landing.js';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul className="navbar">
            <li className="logo">
              <Link to="/Home">
                <Icon name="chess rook" size="huge" /> 
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Home">
                <Icon name="home" size="large" />
                Inicio
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/About">
                <Icon name="info circle" size="large" />
                Acerca de
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Loading">
                <Icon name="spinner" size="large" />
                Loading
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/CV">
                <Icon name="file alternate" size="large" />
                Curriculum Vitae
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Loading" element={<Loading />} />
          <Route path="/CV" element={<CvViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
