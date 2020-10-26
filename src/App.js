import React from 'react';
import logo from './logo.svg';
import './App.css';
import TouchPad from './TouchPad';

function App() {
  return (
    <TouchPad>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Touch or click anywhere to create ripples
        </p>
          <a
            className="App-link"
            href="https://github.com/chukonu/react-touchpad"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
        </a>
        </header>
      </div>
    </TouchPad>
  );
}

export default App;
