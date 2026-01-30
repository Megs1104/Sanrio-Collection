import React, { useState } from 'react';
import CharacterGrid from './components/CharacterGrid';
import './App.css';
import { characters } from './data/characters.js';

function App(){
  return (
    <div className="App">
      <h1>Sanrio Collection</h1>
      <CharacterGrid characters={characters}/>
    </div>
  )
};

export default App;
