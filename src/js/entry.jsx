import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root');

  ReactDOM.render(<Game />, root);
});