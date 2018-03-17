import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SetUp from './SetUp';
import Playing from './Playing';
import EndGame from './EndGame';
import { buildBot } from '../Bots';
import { canonicalData, PropsRoute, buildShips } from './Util';

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

class BattleShip extends React.Component {
  constructor() {
    super();
    this.setPlayerName = this.setPlayerName.bind(this);
    this.surrender = this.surrender.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.playerShoots = this.playerShoots.bind(this);
    this.botShoots = this.botShoots.bind(this);
    this.setBot = this.setBot.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.computeShoot = this.computeShoot.bind(this);
  }
  
  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    const board = canonicalData(10, 10);
    const ships = buildShips();
    this.setState({
      events: [],
      isHorizontal: true,
      ships: ships,
      player: {
        name: '',
        ships: [],
        board: board
      },
      bot: {
        name: '',
        ships: [],
        board: []
      },
      result: 'WON',
      gameOver: false,
      gameRunning: false
    });
  }

  setBot(number) {
    const bot = buildBot(number);
    this.setState({bot});
  }

  setPlayerName(name) {
    const player = {...this.state.player};
    player.name = name;
    this.setState({player});
  }

  changeDirection() {
    let isHorizontal = {...this.state.isHorizontal};
    this.setState({isHorizontal: !isHorizontal});
  }

  placeShip(cellData) {
    const ship = this.state.ships.pop();
    if (ship) {
      ship.setStartCoordinate(cellData, this.props.isHorizontal);
      const player = {...this.state.player}
      player.ships.push(ship);
      cellData.className = 'ship';
      this.setState({player});
    }
  }

  nextTurn() {
    const afloatShip = getAfloatShip(this.state.bot.ships);
    if (afloatShip) {
      let timer = setTimeout( () => {
        clearTimeout(timer);
        this.botShoots();
      }, 500);
    } else {
      const result = 'WON';
      const gameOver = true;
      this.setState({result, gameOver});
    }
  }

  computeShoot(ship, cellData, playerName) {
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
    const events = this.state.events.slice();
    events.push(event);
    this.setState({events});
  }

  botShoots() {
    const coordinate = this.state.bot.getCoordinateForShoot();
    const ship = findShip(this.state.player.ships, coordinate);
    const botName = this.state.bot.name;
    const flatBoard = this.state.player.board.reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      }, []);
    const cellData = flatBoard.find((cell) => {
        return cell.x === coordinate.x &&
              cell.y === coordinate.y;
      });
    this.computeShoot(ship, cellData, botName);
    const afloatShip = getAfloatShip(this.state.bot.ships);
    if (!afloatShip) {
      const result = 'LOST';
      const gameOver = true;
      this.setState({result, gameOver});
    }
  }

  playerShoots(cellData) {
    if (!this.state.gameOver) {
      const ship = findShip(this.state.bot.ships, cellData);
      const playerName = this.state.player.name;
      this.computeShoot(ship, cellData, playerName);
      this.nextTurn();
    }
  }

  surrender() {
    const result = 'SURRENDERED';
    this.setState({result});
  }

  render() {
    return (
      <Router>
        <Switch>
          <PropsRoute
            exact path='/'
            component={SetUp}
            setPlayerName={this.setPlayerName}
            changeDirection={this.changeDirection}
            placeShip={this.placeShip}
            setBot={this.setBot}
            playerBoard={this.state.player.board}/>
          <PropsRoute
            path='/playing'
            component={Playing}
            gameOver={this.state.gameOver}
            events={this.state.events}
            playerBoard={this.state.player.board}
            botBoard={this.state.bot.board}
            surrender={this.surrender}
            playerShoots={this.playerShoots}/>
          <PropsRoute
            path='/end'
            component={EndGame}
            restart={this.setInitialState}
            result={this.state.result}/>
        </Switch>
      </Router>
    )
  }
}

export default BattleShip;