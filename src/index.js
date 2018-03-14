import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import StorePicker from './components/StorePicker';
import App from './components/App';
import './css/style.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={StorePicker}/>
      <Route path='/game' component={App}/>
      <Route path='/end' component={App}/>
    </div>
  </BrowserRouter>,
  document.querySelector('#main')
);