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

const calculateWinner = (squares) => {
  const size = Math.sqrt(squares.length);

  const getRow = i => {
    return squares.slice(i * size, i * size + size);
  }

  const getCol = i => {
    let row = [];
    for (let j = i; j < Math.pow(size, 2); j += size) {
      row.push(squares[j]);
    }
    return row;
  }

  const getDiag1 = () => {
    let row = [];
    for (let i = 0; i < Math.pow(size, 2); i += size + 1) {
      row.push(squares[i]);
    }
    return row;
  }

  const getDiag2 = () => {
    let row = [];
    for (let i = size - 1; i < Math.pow(size, 2) - 1; i += size - 1) {
      row.push(squares[i]);
    }
    return row;
  }
  
  const lines = [getDiag1(), getDiag2()];

  for (let i = 0; i < size; i++) {
    lines.push(getRow(i));
    lines.push(getCol(i));
  }

  for (let i = 0; i < lines.length; i++) {
    const value = lines[i][0];
    if (value && lines[i].slice(1).every(square => square === value)) {
      return value;
    }
  };

  return null;
}