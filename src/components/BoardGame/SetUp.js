import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './Board/Matrix';

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
    this.props.history.push(`/playing`);
  }

  getStyle() {
    return {
      backgroundColor: 'rgba(43, 36, 177, 0.74)',
      border: '1px solid #ddd'
    }
  }

  render() {
    return (
      <div className='w3-center'>
        <form className='class="w3-container w3-card-4"'
          ref={(input) => this.playerForm = input}
          onSubmit={(e) => this.startGame(e)}>
          <h2>Set up game</h2>
          <div className='w3-section'>
            <input
              className="w3-input"
              required=""
              type='text'
              placeholder='Type player name'
              ref={(input)=> this.playerName = input}/>
            <label>Name</label>
          </div>
             <select ref={(input) => this.selectedBot = input}>
              <option value='1'>Canonical</option>
              <option value='2'>Reverse</option>
              <option value='3'>Random</option>
            </select>
            <select ref={(input) => this.direction = input}>
              <option value='true'>Horizontal</option>
              <option value='false'>Vertical</option>
            </select>
          <div className='w3-center'>
            <Matrix 
              data={this.props.playerBoard}
              setStyle={this.getStyle}
              onClick={this.props.placePiece}/>
          </div>
          <button type='submit' className='w3-button w3-theme'>Start game!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SetUp);