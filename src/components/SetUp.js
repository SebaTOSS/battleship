import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './board/Matrix';

class SetUp extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.putShip = this.putShip.bind(this);
  }

  putShip(data, cell) {
    console.log(data);
  }

  startGame(event) {
    event.preventDefault();
    this.props.setPlayerName(this.playerName.value);
    this.playerForm.reset();
    this.props.history.push(`/game`);
  }

  getStyle() {
    return {
      backgroundColor: 'rgba(43, 36, 177, 0.74)',
      border: '1px solid #ddd'
    }
  }

  render() {
    return (
      <div>
        <h2>Set up game</h2>
        <form className='set-up'
          ref={(input) => this.playerForm = input}
          onSubmit={(e) => this.startGame(e)}>
          <p>
            <input
              type='text'
              placeholder='Type player name'
              ref={(input)=> this.playerName = input}/>
          </p>
          <Matrix 
            random={[10, 10]}
            setStyle={this.getStyle}
            onClick={this.putShip}/>
          <button type='submit'>Start game!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SetUp);