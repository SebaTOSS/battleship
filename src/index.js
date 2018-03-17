import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardGame from './components/BoardGame/BoardGame';
import Battleship from './components/Battleship/Game';
import './css/style.css';
import './css/w3.css';
import './css/w3-theme-red.css'

ReactDOM.render(
  <div>
    <Header/>
    <BoardGame game={Battleship}/>
    <Footer/>
  </div>,
  document.querySelector('#main')
);