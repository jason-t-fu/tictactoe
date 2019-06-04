import React from 'react';
import Square from './square';

const Board = ({ size, squares, handleClick }) => {
  const grid = new Array(size).fill(null);

  return (
    <div>
      {grid.map((row, i) => {
        return (
          <div className="board-row" key={i}>
            {squares.slice(i * size, i * size + size).map((square, j) => {
              return (
                <Square
                  key={`${[i, j]}`}
                  value={squares[i * size + j]}
                  handleClick={() => handleClick(i * size + j)}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Board;