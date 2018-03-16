import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SetUp from './SetUp';
import Game from './Game';
import EndGame from './EndGame';
import { buildBot } from '../Bots';
import Ship from '../Ship';
import { canonicalData } from './Util';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const buildShips = function buildShips() {
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
      gameOver: false
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

  placeShip(coordinate, cell) {
    const ship = this.state.ships.pop();
    if (ship) {
      ship.setStartCoordinate(coordinate, this.props.isHorizontal);
      this.state.player.ships.push(ship);
      cell.setBackgroundColor("black");
    }
  }

  nextTurn() {
    const afloatShip = getAfloatShip(this.state.bot.ships);
    if (afloatShip) {
      let timer = setTimeout( () => {
        clearTimeout(timer);
        this.botShoots();
      }, 1000);
    } else {
      const result = 'WON';
      const gameOver = true;
      this.setState({result, gameOver});
    }
  }

  computeShoot(ship, coordinate, playerName) {
    let event = {
      timestamp: Date.now()
    };
    if (ship) {
      ship.hit(coordinate);
      if (ship.isSunk()) {
        event.message = `${playerName} - SHIP DESTROYED!`;
        event.class = 'destroy';
      } else {
        event.message = `${playerName} - HIT!`;
        event.class = 'hit';
      }
    } else {
      event.message = `${playerName} - MISSED!`;
      event.class = 'missed';
    }
    console.log(event);
    const events = this.state.events.slice();
    events.push(event);
    this.setState({events});
  }

  botShoots() {
    const coordinate = this.state.bot.getCoordinateForShoot();
    console.log(coordinate);
    const ship = findShip(this.state.player.ships, coordinate);
    const botName = this.state.bot.name;
    this.computeShoot(ship, coordinate, botName);
    const afloatShip = getAfloatShip(this.state.bot.ships);
    if (!afloatShip) {
      const result = 'LOST';
      const gameOver = true;
      this.setState({result, gameOver});
    }
  }

  playerShoots(coordinate) {
    if (!this.state.gameOver) {
      const ship = findShip(this.state.bot.ships, coordinate);
      const playerName = this.state.player.name;
      this.computeShoot(ship, coordinate, playerName);
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
            setBot={this.setBot}/>
          <PropsRoute
            path='/game'
            component={Game}
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