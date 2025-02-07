
import React from 'react';

// import logo from '/app/src/logo.svg';      // para trabajar con docker
// import '/app/src/App.css';                 // para trabajar con docker
import logo from '../logo.svg';                // para trabajar en local
import '../App.css';                           // para trabajar en local

function Loading() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Loading;
