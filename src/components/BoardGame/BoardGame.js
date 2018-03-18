import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PropsRoute } from './Util';
import SetUp from './SetUp';
import Playing from './Playing';
import EndGame from './EndGame';

class BoardGame extends React.Component {
  constructor() {
    super();
    this.setPlayerName = this.setPlayerName.bind(this);
    this.surrender = this.surrender.bind(this);
    this.placePiece = this.placePiece.bind(this);
    this.playsPlayer = this.playsPlayer.bind(this);
    this.setBot = this.setBot.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
  }
  
  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    const game = new this.props.game();
    this.setState({
      game: game,
      isHorizontal: true
    });
  }
  
  changeDirection() {
    let isHorizontal = !this.state.isHorizontal;
    this.setState({isHorizontal});
  }

  setBot(number) {
    const game = Object.assign(this.state.game);
    game.setBot(number);
    this.setState({game});
  }

  setPlayerName(name) {
    const game = Object.assign(this.state.game);
    game.setPlayerName(name);
    this.setState({game});
  }

  updateEvents() {
    const events = this.state.game.events.slice();
    this.setState({events});
  }

  /**
   * Hotspot for BoardGame.
   * Calls to game instance with cell object and refresh the game
   * @param {object} cell 
   */
  placePiece(cell) {
    const game = Object.assign(this.state.game);
    game.placePiece(cell, this.state.isHorizontal);
    this.setState({game});
  }

  /**
   * Hotspot for BoardGame.
   * Executes player play calling the instance game.
   * If game is not over, calls game to execute bot play.
   * @param {object} cell 
   */
  playsPlayer(cell) {
    if (!this.state.game.isGameOver) {
      this.state.game.playsPlayer(cell);
      this.updateEvents();
      let isGameOver = this.state.game.isGameOver;
      if (!isGameOver) {
        let timer = setTimeout( () => {
          clearTimeout(timer);
          this.state.game.playsBot();
          this.updateEvents();
        }, 200);
      } else {
        const result = this.state.game.result;
        this.setState({result});
      }
    }
  }

  /**
   * Hotspot for BoardGame.
   * Ends game with player lost.
   */
  surrender() {
    const game = Object.assign(this.state.game);
    game.surrender();
    this.setState({game});
  }

  render() {
    return (
      <Router>
        <Switch>
          <PropsRoute
            exact path='/'
            component={SetUp}
            setPlayerName={this.setPlayerName}
            direction={this.props.isHorizontal}
            changeDirection={this.changeDirection}
            placePiece={this.placePiece}
            setBot={this.setBot}
            playerBoard={this.state.game.player.board}/>
          <PropsRoute
            path='/playing'
            component={Playing}
            isGameOver={this.state.game.isGameOver}
            events={this.state.game.events}
            playerBoard={this.state.game.player.board}
            botBoard={this.state.game.bot.board}
            surrender={this.surrender}
            playsPlayer={this.playsPlayer}/>
          <PropsRoute
            path='/end'
            component={EndGame}
            restart={this.setInitialState}
            result={this.state.game.result}/>
        </Switch>
      </Router>
    )
  }
}

BoardGame.propTypes = {
  game: PropTypes.object,
};

export default BoardGame;