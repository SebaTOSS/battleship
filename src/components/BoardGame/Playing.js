import React from 'react';
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

  renderEvent(event) {
    return (
      <li key={event.timestamp}
          className={event.class}>
        {event.message}
      </li>
    )
  }

  renderButtons() {
    return (
      <div className='buttons-container'>
        <p>
          <button
            onClick={this.surrender}
            disabled={this.props.gameOver}>
            Surrender
          </button>
          <button
            onClick={this.gameOver}
            disabled={!this.props.gameOver}>
            Game Over
          </button>
        </p>
      </div>
    );
  }

  renderEvents() {
    return (
      <div>
        <h3>Shoots</h3>
        <ul>
          {this.props.events.map(this.renderEvent)}
        </ul>
      </div>
    );
  }

  renderBotBoard() {
    return (
      <div>
        <h3>Enemy Ships</h3>
        <Matrix 
          data={this.props.botBoard}
          setStyle={this.getStyle}
          onClick={this.props.playsPlayer}/>
      </div>
    );
  }

  renderPlayerBoard() {
    return (
      <div>
        <h3>My Ships</h3>
        <Matrix 
          data={this.props.playerBoard}
          setStyle={this.getStyle}/>
      </div>
    );
  }

  render() {
    return (
      <div className='playing'>
        <h2>Playing</h2>
        {this.renderPlayerBoard()}
        {this.renderBotBoard()}
        {this.renderEvents()}
        {this.renderButtons()}
      </div>
    )
  }
}

export default withRouter(Playing);