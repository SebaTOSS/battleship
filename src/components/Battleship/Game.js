import { canonicalData } from './Util';
import Ship from './Ship';
import { createAlphaGo, createRandom } from './Bots';

export function createBoard() {
  return canonicalData(10, 10);
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

export function playerShoots(ships, cell, name) {
  const ship = findShip(ships, cell);
  return computeShoot(ship, cell, name);
}

export function wonPlayer(ships) {
  const afloatShip = getAfloatShip(ships);
  let result, gameOver;
  if (afloatShip) {
    result = '';
    gameOver = false;
  } else {
    result = 'WON';
    gameOver = true;
  }
  return { result, gameOver };
}

export function wonBot(ships) {
  const afloatShip = getAfloatShip(ships);
  let result, gameOver;
  if (afloatShip) {
    result = '';
    gameOver = false;
  } else {
    result = 'LOST';
    gameOver = true;
  }
  return { result, gameOver };
}

export function computeShoot(ship, cellData, playerName) {
  const event = {
    timestamp: Date.now(),
    message: `${playerName} - MISSED!`,
    class: 'water',
  };
  if (ship) {
    ship.hit(cellData);
    if (ship.isSunk()) {
      event.message = `${playerName} - SHIP DESTROYED!`;
      event.class = 'ship-destroy';
    } else {
      event.message = `${playerName} - HIT!`;
      event.class = 'ship-hit';
    }
  }
  cellData.className = event.class;
  return event;
}

export function botShoots(parameters) {
  const coordinate = parameters.bot.getCoordinateForShoot();
  const ship = findShip(parameters.ships, coordinate);
  const flatBoard = parameters.board.reduce(
    (accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);
  const cellData = flatBoard.find((cell) => {
      return cell.x === coordinate.x &&
            cell.y === coordinate.y;
    });
  return computeShoot(ship, cellData, parameters.name);
}

const getAfloatShip = function getAfloatShip(collection) {
  return collection.find(
    (ship) => !ship.isSunk()
  );
}

const findShip = function findShip(collection, coordinate) {
  return collection.find(
    (ship) => ship.isInCoordinate(coordinate)
  );
}