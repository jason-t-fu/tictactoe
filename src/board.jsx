import React, { useState } from 'react';
import Square from './square';

const Board = ({ size }) => {
  const numSquares = Math.pow(size, 2);
  const [squares, setSquares] = useState(new Array(numSquares).fill(null));
  const [currPlayer, setCurrPlayer] = useState('X');

  const renderSquare = i => {
    return (
      <Square 
        value={squares[i]}
        handleClick={() => handleClick(i)}
      />
    );
  };

  const handleClick = i => {
    if (calculateWinner(squares) || squares[i]) return;

    const dupSquares = [...squares];
    dupSquares[i] = currPlayer;
    setSquares(dupSquares);
    setCurrPlayer( currPlayer === 'X' ? 'O' : 'X' );
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `${winner} wins!`;
  }
  else {
    status = `Next player: ${currPlayer}`;
  }

  return (
    <div>
      <div className = "status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board;

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
