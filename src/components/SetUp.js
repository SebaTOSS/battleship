import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './board/Matrix';
import { canonicalData } from './Util';

class SetUp extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }

  startGame(event) {
    event.preventDefault();
    this.props.setPlayerName(this.playerName.value);
    this.props.setBot(this.selectedBot.value);
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
    const matrix = canonicalData(10, 10);
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
             <select ref={(input) => this.selectedBot = input}>
              <option value='1'>DeepBlue</option>
              <option value='2'>AlphaGo</option>
              <option value='' default>Random</option>
            </select>
          </p>
          <Matrix 
            data={matrix}
            setStyle={this.getStyle}
            onClick={this.props.placeShip}/>
          <button type='submit'>Start game!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SetUp);