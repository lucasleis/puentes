import React from 'react';
import './App.css';
import './css/estilos-home.css';
import './css/estilos-basicos.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Loading from './pages/Loading.js';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
            <li className="logo">
              <Link to="/Home">
                <Icon name="chess rook" size="huge" /> 
              </Link>
            </li>
            <li>
              <Link to="/Home">Inicio</Link>
            </li>
            <li>
              <Link to="/About">Acerca de</Link>
            </li>
            <li>
              <Link to="/Loading">Loading</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Loading" element={<Loading />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
