import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SetUp from './SetUp';
import Game from './Game';
import EndGame from './EndGame';

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
    this.state = {
      player: {
        name: '',
        board: {}
      },
      pc: {
        board: {}
      },
      winner: 'PC'
    }
  }

  setPlayerName(name) {
    const player = {...this.state.player};
    player.name = name;
    this.setState({player});
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
      <div>
        <Router>
          <Switch>
            <PropsRoute
              exact path='/'
              component={SetUp}
              setPlayerName={this.setPlayerName}/>
            <PropsRoute 
              path='/game'
              component={Game}
              surrender={this.surrender}
              setWinner={this.setWinner}/>
            <PropsRoute 
              path='/end'
              component={EndGame}
              winner={this.state.winner}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BattleShip;