import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Battleship from './components/Battleship';

ReactDOM.render(
  <div>
    <Header/>
    <Battleship/>
    <Footer/>
  </div>,
  document.querySelector('#main')
);