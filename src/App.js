import React, { Component } from 'react';
import logo from './logo.svg';
import Jokes from './Jokes.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jokes />
      </div>
    );
  }
}

export default App;
