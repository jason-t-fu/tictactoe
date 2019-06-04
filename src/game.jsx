import React, { useState } from 'react';
import Board from "./board";

const Game = props => {
  const size = 3;
  const numSquares = 9;
  const [history, setHistory] = useState([{
    squares: new Array(numSquares).fill(null)
  }]);
  const [currPlayer, setCurrPlayer] = useState('X');
  const [stepNumber, setStepNumber] = useState(0);

  const moves = history.map((step, i) => {
    const desc = i ?
      'Go to move #' + i :
      'Go to game start';
    return (
      <li key={i}>
        <button onClick={() => jumpTo(i)} >
          {desc}
        </button>
      </li>
    );
  });

  console.log(history.length);
  console.log(stepNumber);

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

  const jumpTo = step => {
    setStepNumber(step);
    setCurrPlayer(step % 2 === 0 ? 'X' : 'O');
  }

  return(
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          handleClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
