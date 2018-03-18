import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import Matrix from './Board/Matrix';

class Playing extends React.Component {
  constructor() {
    super();
    this.surrender = this.surrender.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.renderPlayerBoard = this.renderPlayerBoard.bind(this);
    this.renderBotBoard = this.renderBotBoard.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  surrender(event) {
    this.props.surrender();
    this.props.history.push(`/end`);
  }

  gameOver(event) {
    this.props.history.push(`/end`);
  }

  getStyle() {
    return {
      backgroundColor: '#d4d4d4',
      border: '1px solid #1a1a1a'
    }
  }

  renderPlayerBoard() {
    return (
      <div className="w3-third">
        <div className='w3-card w3-container'>
          <h3>My Ships</h3>
          <Matrix 
            data={this.props.playerBoard}
            setStyle={this.getStyle}/>
        </div>
      </div>
    );
  }

  renderBotBoard() {
    return (
      <div className="w3-third">
        <div className='w3-card w3-container'>
          <h3>Enemy Ships</h3>
          <Matrix 
            data={this.props.botBoard}
            setStyle={this.getStyle}
            onClick={this.props.playsPlayer}/>
        </div>
      </div>
    );
  }

  renderEvents() {
    return (
      <div className="w3-third">
        <div className='w3-card w3-container'>
          <h3>Shoots</h3>
          <ul className='w3-ul w3-margin-bottom'>
            {this.props.events.map(this.renderEvent)}
          </ul>
        </div>
      </div>
    );
  }

  renderEvent(event) {
    return (
      <li
        key={event.timestamp}
        className={ 'event ' + event.class}>
        {event.message}
      </li>
    )
  }

  renderButtons() {
    return (
      <div className='w3-card w3-container'>
        <p>
          <button
            onClick={this.surrender}
            disabled={this.props.isGameOver}
            className='w3-button w3-theme'>
            Surrender
          </button>
          <button
            onClick={this.gameOver}
            disabled={!this.props.isGameOver}
            className='w3-button w3-theme'>
            Game Over
          </button>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="w3-center">
        <header className="w3-container w3-blue-grey">
          <h2>Playing</h2>
        </header>
        {this.renderPlayerBoard()}
        {this.renderBotBoard()}
        {this.renderEvents()}
        {this.renderButtons()}
      </div>
    )
  }
}

Playing.propTypes = {
  isGameOver: PropTypes.bool,
  events: PropTypes.array,
  playerBoard: PropTypes.array,
  botBoard: PropTypes.array,
  surrender: PropTypes.func,
  playsPlayer: PropTypes.func,
};

export default withRouter(Playing);