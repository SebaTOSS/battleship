import React from 'react';
import { Route } from 'react-router-dom';
import Ship from '../Ship';

export function randomData(col, row) {
  var data = [];
  for (var i = 0; i < col; i++) {
    var column = [];
    for (var j = 0; j < row; j++) {
      column.push({
        val: Math.floor(Math.random() * 100)
      });
    }
    data.push(column);
  }
  return data;
}

export function canonicalData(col, row) {
  var data = [];
  for (var i = 0; i < col; i++) {
    var column = [];
    for (var j = 0; j < row; j++) {
      column.push({
        x: i,
        y: j,
        className: 'test'
      });
    }
    data.push(column);
  }
  return data;
}

export function linearCanonicalCoordinates(col, row) {
  var data = [];
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      data.push({
        x: i,
        y: j
      });
    }
  }
  return data;
}

function renderMergedProps(component, ...rest) {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

export function PropsRoute({ component, ...rest }) {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export function buildShips() {
  const ships = [];
  let ship;
  ships.push(new Ship(2));
  for (let index = 0; index < 3; index++) {
    ship = new Ship(3);
    ships.push(ship);
  }
  ships.push(new Ship(4));
  return ships;
}
