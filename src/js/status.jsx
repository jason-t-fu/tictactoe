import React from 'react';
import calculateWinner from './calculateWinner';

const Status = ({ squares, currPlayer }) => {

  let winner = calculateWinner(squares);

  return (
    <div>
      {winner ? `${winner} wins!` : `Next player: ${currPlayer}`}
    </div>
  )
};

export default Status;