import Ship from './Ship';
import { canonicalData, linearCanonicalCoordinates } from './Util';

function createCanonical() {
  return {
    name: 'Canonical',
    cells: linearCanonicalCoordinates(10, 10),
    getCoordinateForShoot: function() {
      const coordinate = this.cells.shift();
      return coordinate;
    }
  };
}

function createReverse() {
  return {
    name: 'Reverse',
    cells: linearCanonicalCoordinates(10, 10),
    getCoordinateForShoot: function() {
      const coordinate = this.cells.pop();
      return coordinate;
    }
  };
}

function createRandom() {
  return {
    name: 'Random',
    getCoordinateForShoot: function(board) {
      return {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
      };
    }
  };
}

export function buildBot(type) {
  let bot;
  switch (type) {
    case '1':
      bot = createCanonical();
      break;
    case '2':
      bot = createReverse();
      break;
    case '3':
      bot = createRandom();
      break;
    default:
      bot = createRandom();
      break;
  }
  bot.board = canonicalData(10, 10);
  bot.ships = [];
  let ship = new Ship(4, bot.board);
  ship.setStartCoordinate({x:9, y:0}, true);
  bot.ships.push(ship);
  ship = new Ship(3, bot.board);
  ship.setStartCoordinate({x:0, y:0}, false);
  bot.ships.push(ship);
  ship = new Ship(3, bot.board);
  ship.setStartCoordinate({x:3, y:3}, false);
  bot.ships.push(ship);
  ship = new Ship(3, bot.board);
  ship.setStartCoordinate({x:7, y:0}, false);
  bot.ships.push(ship);
  ship = new Ship(2, bot.board);
  ship.setStartCoordinate({x:6, y:2}, true);
  bot.ships.push(ship);
  ship = new Ship(2, bot.board);
  ship.setStartCoordinate({x:5, y:7}, true);
  bot.ships.push(ship);
  return bot;
}