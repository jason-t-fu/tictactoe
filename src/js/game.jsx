import React, { useState, useEffect } from 'react';
import Board from "./board";
import History from "./history";

const Game = props => {
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState([{
    squares: new Array(Math.pow(size, 2)).fill(null)
  }]);
  const [currPlayer, setCurrPlayer] = useState('X');
  const [stepNumber, setStepNumber] = useState(0);
  const [errors, setErrors] = useState(null);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  if (winner) {
    status = `${winner} wins!`;
  }
  else {
    status = `Next player: ${currPlayer}`;
  }

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

  return(
    <div className="game">
      <div className="game-board">
        <Board 
          size={size}
          squares={current.squares}
          handleClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <History 
          history={history} 
          setStepNumber={setStepNumber} 
          setCurrPlayer={setCurrPlayer}
        />
      </div>
      <div className="game-size">
        <p>Set the number of rows:</p>
        <input id="size" defaultValue={size} />
        <button onClick={handleSubmit}>Set</button>
        {errors}
      </div>
    </div>
  )
};

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
