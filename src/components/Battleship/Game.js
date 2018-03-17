import { canonicalData } from './Util';
import Ship from './Ship';
import { createAlphaGo, createRandom } from './Bots';

function createBoard() {
  return canonicalData(10, 10);
}

function buildShips() {
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

function buildBot(type) {
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

function wonPlayer(ships) {
  const afloatShip = getAfloatShip(ships);
  let result, isGameOver;
  if (afloatShip) {
    result = '';
    isGameOver = false;
  } else {
    result = 'WON';
    isGameOver = true;
  }
  return { result, isGameOver };
}

function wonBot(ships) {
  const afloatShip = getAfloatShip(ships);
  let result, isGameOver;
  if (afloatShip) {
    result = '';
    isGameOver = false;
  } else {
    result = 'LOST';
    isGameOver = true;
  }
  return { result, isGameOver };
}

function computeShoot(ship, cell, playerName) {
  const event = {
    timestamp: Date.now(),
    message: `${playerName} - MISSED!`,
    class: 'water',
  };
  if (ship) {
    ship.hit(cell);
    if (ship.isSunk()) {
      event.message = `${playerName} - SHIP DESTROYED!`;
      event.class = 'ship-destroy';
    } else {
      event.message = `${playerName} - HIT!`;
      event.class = 'ship-hit';
    }
  }
  cell.className = event.class;
  return event;
}

function botShoots(parameters) {
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

export default class Battleship {
  constructor() {
    const board = createBoard();
    this.ships = buildShips();
    this.events = [];
    this.player = {
      name: '',
      ships: [],
      board: board
    };
    this.bot = {
      name: '',
      ships: [],
      board: []
    };
    this.result = 'WON';
    this.isGameOver = false;
  }
  
  createBoard() {
    return this.player.board;
  }

  getPieces() {
    return this.ships;
  }

  surrender() {
    this.result = 'SURRENDERED';
  }

  placePiece(cell, direction) {
    const ship = this.ships.pop();
    if (ship) {
      ship.setStartCoordinate(cell, direction);
      const player = {...this.player}
      player.ships.push(ship);
      cell.className = 'ship';
    }
  }

  setBot(number) {
    this.bot = buildBot(number);
  }

  setPlayerName(name) {
    this.player.name = name;
  }

  playerShoots(cell) {
    const ship = findShip(this.bot.ships, cell);
    const event = computeShoot(ship, cell, this.player.name);
    this.events.push(event);
  }

  botShoots() {
    const parameters = {
      bot: this.bot,
      ships: this.player.ships,
      board: this.player.board,
      name: this.bot.name
    }
    const event = botShoots(parameters);
    this.events.push(event);
  }

  playsPlayer(cell) {
    this.playerShoots(cell);
    const { result, isGameOver } = wonPlayer(this.bot.ships);
    this.result = result;
    this.isGameOver = isGameOver;
  }

  playsBot() {
    this.botShoots();
    const { result, isGameOver } = wonBot(this.player.ships);
    this.result = result;
    this.isGameOver = isGameOver;
  }
}