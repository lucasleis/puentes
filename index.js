// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';


// import App from '/app/src/App.js';     // para trabajar con docker
import App from './App.js';               // para trabajar en local

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

