import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PropsRoute } from './Util';
import SetUp from './SetUp';
import Playing from './Playing';
import EndGame from './EndGame';
import {
  createBoard, buildShips, buildBot, 
  playerShoots, botShoots,
  wonPlayer, wonBot
} from '../Battleship/Game';

class BoardGame extends React.Component {
  constructor() {
    super();
    this.setPlayerName = this.setPlayerName.bind(this);
    this.surrender = this.surrender.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.playsPlayer = this.playsPlayer.bind(this);
    this.playsBot = this.playsBot.bind(this);
    this.setBot = this.setBot.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  
  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    const board = createBoard();
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

  addEvent(event) {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({events});
  }

  playsBot() {
    const parameters = {
      bot: this.state.bot,
      ships: this.state.player.ships,
      board: this.state.player.board,
      name: this.state.bot.name
    }
    const event = botShoots(parameters);
    this.addEvent(event);
    const ships = this.state.player.ships;
    let { result, gameOver } = wonBot(ships);
    this.setState({result, gameOver});
  }

  playsPlayer(cell) {
    if (!this.state.gameOver) {
      let ships = this.state.bot.ships;
      const playerName = this.state.player.name;
      let event = playerShoots(ships, cell, playerName);
      this.addEvent(event);
      ships = this.state.bot.ships;
      let { result, gameOver } = wonPlayer(ships);
      this.setState({result, gameOver});
      if (!gameOver) {
        let timer = setTimeout( () => {
          clearTimeout(timer);
          this.playsBot();
        }, 500);
      }
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
            playsPlayer={this.playsPlayer}/>
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

export default BoardGame;