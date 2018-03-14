import React from 'react';
import { withRouter } from 'react-router-dom'
import Board from './Board';

class SetUp extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }
  startGame(event) {
    event.preventDefault();
    this.props.setPlayerName(this.playerName.value);
    this.playerForm.reset();
    this.props.history.push(`/game`);
  }
  render() {
    return (
      <div>
        <h2>Set up game</h2>
        <form className='set-up'
          ref={(input) => this.playerForm = input}
          onSubmit={(e) => this.startGame(e)}>
          <p>
            <input type='text' 
              placeholder='Type player name'
              ref={(input)=> this.playerName = input}/>
          </p>
          <Board/>
          <button type='submit'>Start game!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SetUp);