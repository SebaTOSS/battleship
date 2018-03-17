import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardGame from './components/BoardGame/BoardGame';
import './css/style.css';

ReactDOM.render(
  <div>
    <Header/>
    <BoardGame/>
    <Footer/>
  </div>,
  document.querySelector('#main')
);