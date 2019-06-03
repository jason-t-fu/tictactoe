import React from 'react';
import Board from "./board";

const Game = props => {
  return(
    <div className="game">
      <div className="game-board">
        <Board size={3}/>
      </div>
      <div className="game-info">
        <div></div>
        <ol></ol>
      </div>
    </div>
  )
};

export default Game;