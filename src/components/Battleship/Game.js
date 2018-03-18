import { canonicalData } from './Util';
import Ship from './Ship';
import { buildBot } from './Bots';

/**
 * Utility function for create game board
 */
const createBoard = function createBoard() {
  return canonicalData(10, 10);
}
/**
 * Utility function for create all ships for game
 * @param {object} board
 * @returns {array} of Ships
 */
const buildShips = function buildShips(board) {
  const ships = [];
  let ship;
  ships.push(new Ship(2, board));
  for (let index = 0; index < 3; index++) {
    ship = new Ship(3, board);
    ships.push(ship);
  }
  ships.push(new Ship(4, board));
  return ships;
}

/**
 * Compute and checks if player won
 * @param {array} ships 
 * @returns {boolean}
 */
const wonPlayer = function wonPlayer(ships) {
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

/**
 * Compute and checks if bot won
 * @param {array} ships 
 * @returns {boolean}
 */
const wonBot = function wonBot(ships) {
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

/**
 * Compute a shoot for a ship into a cell.
 * Returns event result: [MISSED | HIT | SHIP DESTROY] with player name
 * @param {object} ship 
 * @param {object} cell 
 * @param {string} playerName 
 * @returns {object} event
 */
const computeShoot = function computeShoot(ship, cell, playerName) {
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
      ship.coordinates.forEach((coordinate) => {
        coordinate.className = 'ship-destroy';
      });
    } else {
      event.message = `${playerName} - HIT!`;
      event.class = 'ship-hit';
    }
  }
  cell.className = event.class;
  return event;
}

/**
 * Executes a bot shoot.
 * @param {object} parameters 
 */
const botShoots = function botShoots(parameters) {
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

/**
 * Return the first ship that is not sunk
 * @param {array} collection of ships
 */
const getAfloatShip = function getAfloatShip(collection) {
  return collection.find(
    (ship) => !ship.isSunk()
  );
}

/**
 * Returns if exists one ship in the coordinate
 * @param {array} collection of ships
 * @param {object} coordinate 
 */
const findShip = function findShip(collection, coordinate) {
  return collection.find(
    (ship) => ship.isInCoordinate(coordinate)
  );
}

/**
 * Class that implements all logic for battleship game.
 * Contains player, bot and board for each one.
 */
export default class Battleship {
  constructor() {
    const board = createBoard();
    this.ships = buildShips(board);
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

  /**
   * Ends game making player lose
   */
  surrender() {
    this.result = 'SURRENDERED';
  }

  /**
   * Hook for put a ship into a cell with direction
   * @param {object} cell 
   * @param {boolean} direction 
   */
  placePiece(cell, direction) {
    const ship = this.ships.pop();
    if (ship) {
      ship.setStartCoordinate(cell, direction);
      ship.coordinates.forEach((coordinate)=> {
        coordinate.className = 'ship';
      });
      const player = {...this.player}
      player.ships.push(ship);
    }
  }

  setBot(number) {
    this.bot = buildBot(number);
  }

  setPlayerName(name) {
    this.player.name = name;
  }

  /**
   * Makes a shoot for player in the cell
   * @param {object} cell 
   */
  playerShoots(cell) {
    const ship = findShip(this.bot.ships, cell);
    const event = computeShoot(ship, cell, this.player.name);
    this.events.push(event);
  }

  /**
   * Make a shoot for bot.
   */
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

  /**
   * Hook for game to trigger battleship game logic
   * @param {object} cell 
   */
  playsPlayer(cell) {
    this.playerShoots(cell);
    const { result, isGameOver } = wonPlayer(this.bot.ships);
    this.result = result;
    this.isGameOver = isGameOver;
  }

  /**
   * Hook for game to trigger battleship game logic
   */
  playsBot() {
    this.botShoots();
    const { result, isGameOver } = wonBot(this.player.ships);
    this.result = result;
    this.isGameOver = isGameOver;
  }
}