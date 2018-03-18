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
      <div className='w3-center w3-border-theme'>
        <h2>Set up game</h2>
        <form className='class="w3-container"'
          ref={(input) => this.playerForm = input}
          onSubmit={(e) => this.startGame(e)}>
          <div className="w3-row-padding w3-center w3-margin-top">
            <div className="w3-third">
              <div className="w3-card w3-container">
                <h3>Name</h3>
                <p>Type your name for the battle</p>
                <input
                  className="w3-input"
                  required=""
                  type='text'
                  placeholder='Type your battle name'
                  ref={(input)=> this.playerName = input}/>
                <label>Battle Name</label>
              </div>
            </div>
            <div className="w3-third">
              <div className="w3-card w3-container">
                <h3>Battleship Deploy</h3>
                <p>Click on map to put your ships in this order</p>
                <p>1 ships of 4 spaces</p>
                <p>3 ships of 3 spaces</p>
                <p>1 ships of 2 spaces</p>
                <p>Use selection for position</p>
                <select ref={(input) => this.direction = input}
                  value={this.props.direction} 
                  onChange={this.props.changeDirection}>
                  <option value='true'>Horizontal</option>
                  <option value='false'>Vertical</option>
                </select>
                <div className='w3-center'>
                  <Matrix 
                    data={this.props.playerBoard}
                    setStyle={this.getStyle}
                    onClick={this.props.placePiece}/>
                </div>
              </div>
              <button 
                type='submit' 
                className='w3-button w3-theme'>
                  Start game!
                </button>
            </div>
            <div className="w3-third">
              <div className="w3-card w3-container">
                <h3>Bot Selection</h3>
                <p>Choose witch bot you want to fight</p>
                <p>Canonical: Selects cells in order</p>
                <p>Reverse: Selects cells in reverse order</p>
                <p>Random: Selects cells in random order</p>
                <p>
                  <select ref={(input) => this.selectedBot = input}>
                    <option value='1'>Canonical</option>
                    <option value='2'>Reverse</option>
                    <option value='3'>Random</option>
                  </select>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(SetUp);