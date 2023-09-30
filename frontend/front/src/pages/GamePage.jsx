// GamePage.jsx
import React from 'react';
import GameBoard from '../components/GameBoard/GameBoard';
import './GamePage.css';

function GamePage() {
  return (
    <div className="game-page">
      <h1>Choose Your Path</h1>
      <GameBoard />
    </div>
  );
}

export default GamePage;
