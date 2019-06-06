import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

import '../css/reset.css';
import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root');
  
  ReactDOM.render(<Game />, root);
});