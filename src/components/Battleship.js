import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SetUp from './SetUp';
import Game from './Game';
import EndGame from './EndGame';
import { buildBot } from '../Bots';

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

class BattleShip extends React.Component {
  constructor() {
    super();
    this.setPlayerName = this.setPlayerName.bind(this);
    this.surrender = this.surrender.bind(this);
    this.setWinner = this.setWinner.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.playerShoots = this.playerShoots.bind(this);
    this.setBot = this.setBot.bind(this);
    // TODO change the board to the user
    const playerBoard = [ [{x:0, y:0, ship: true}, {x:0, y:1}], [{x:1, y:0}, {x:1, y:1}] ];
    this.state = {
      player: {
        name: '',
        remainingShips: 1,
        board: playerBoard
      },
      bot: {
        remainingShips: 1
      },
      winner: 'PC'
    }
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

  placeShip(data, cell) {
    console.log(data);
    data.ship = true;
    cell.setBackgroundColor("black");
  }

  playerShoots(data, cell) {
    console.log(data);
    let output, hit;
    if (data.ship) {
      hit = true;
      output = 'Player HIT!';
      cell.setBackgroundColor("red");
    } else {
      hit = false;
      output = 'Player MISSED!';
      cell.setBackgroundColor("lightblue");
    }
    console.log(output);
    if (hit) {
      const bot = this.state.bot;
      bot.remainingShips = bot.remainingShips - 1;
    } else {
      const position = this.state.bot.shoots(this.state.player.board);
      console.log(position);
    }
  }

  surrender() {
    const winner = 'SURRENDERED';
    this.setState({winner});
  }

  setWinner(isPlayer) {
    const winner = (isPlayer)? this.state.player.name : 'PC';
    this.setState({winner});
  }

  render() {
    return (
        <Router>
          <Switch>
            <PropsRoute
              exact path='/'
              component={SetUp}
              setPlayerName={this.setPlayerName}
              placeShip={this.placeShip}
              setBot={this.setBot}/>
            <PropsRoute
              path='/game'
              component={Game}
              playerBoard={this.state.player.board}
              botBoard={this.state.bot.board}
              surrender={this.surrender}
              setWinner={this.setWinner}
              playerShoots={this.playerShoots}/>
            <PropsRoute
              path='/end'
              component={EndGame}
              winner={this.state.winner}/>
          </Switch>
        </Router>
    )
  }
}

export default BattleShip;