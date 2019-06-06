import React, { useState } from 'react';
import Board from "./board";
import History from "./history";
import Status from "./status";
import Size from './size';

import calculateWinner from './calculateWinner';

const Game = props => {
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState([{
    squares: new Array(Math.pow(size, 2)).fill(null)
  }]);
  const [currPlayer, setCurrPlayer] = useState('X');
  const [stepNumber, setStepNumber] = useState(0);
  const [errors, setErrors] = useState(null);

  const handleClick = i => {
    const currHistory = history.slice(0, stepNumber + 1);
    const current = currHistory[currHistory.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = currPlayer;
    setHistory(currHistory.concat([{
      squares
    }]));
    setCurrPlayer(currPlayer === 'X' ? 'O' : 'X');
    setStepNumber(currHistory.length);
  };

  const handleSubmit = () => {
    const resetGame = size => {
      setSize(size);
      setHistory([{
        squares: new Array(Math.pow(size, 2)).fill(null)
      }]);
      setCurrPlayer('X');
      setStepNumber(0);
      setErrors(null);
    };

    let input = document.getElementById('size').value;
    let size = parseInt(input, 10);
    if (size) {
      resetGame(size);
    }
    else {
      setErrors('Input a valid number');
    }
  };

  return (
    <div className="game">
      <div className="board-info-container">
        <div className="game-board">
          <Board
            size={size}
            squares={history[stepNumber].squares}
            handleClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <Status
            squares={history[stepNumber].squares}
            currPlayer={currPlayer}
          />
          <History
            history={history}
            setStepNumber={setStepNumber}
            setCurrPlayer={setCurrPlayer}
          />
        </div>
      </div>
      <Size
        size={size}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  )
};

export default Game;