// App.jsx
import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Welcome to the Monty Hall Game</h1>
            <GameBoard />
        </div>
    );
}

export default App;

