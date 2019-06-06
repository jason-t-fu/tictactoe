import React from 'react';

const Size = ({ size, handleSubmit, errors }) => {
  return (
    <div className="game-size">
      <p>Set the number of rows:</p>
      <input id="size" defaultValue={size} />
      <button onClick={handleSubmit}>Set</button>
      {errors}
    </div>
  )
};

export default Size;