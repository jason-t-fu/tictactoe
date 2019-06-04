import React from 'react';

const History = ({ history, setStepNumber, setCurrPlayer }) => {

  const jumpTo = step => {
    setStepNumber(step);
    setCurrPlayer(step % 2 === 0 ? 'X' : 'O');
  }

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

  return (
    <ol>
      {moves}
    </ol>
  )
};

export default History;