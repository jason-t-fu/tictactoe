
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
};

module.exports = calculateWinner;