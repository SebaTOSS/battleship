import Ship from './Ship';
import { canonicalData, linearCanonicalCoordinates } from './components/Util';

export function createAlphaGo() {
  return {
    name: 'DeepBlue',
    cells: linearCanonicalCoordinates(10, 10),
    getCoordinateForShoot: function() {
      const coordinate = this.cells.pop();
      return coordinate;
    }
  };
}

export function createRandom() {
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
      bot = createAlphaGo();
      break;
    case '2':
      bot = createRandom();
      break;
    default:
      bot = createRandom();
      break;
  }
  const ship = new Ship(3);
  ship.setStartCoordinate({x:0, y:0}, false);
  bot.ships = [];
  bot.ships.push(ship);
  bot.board = canonicalData(10, 10);
  return bot;
}