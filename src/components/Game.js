import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './board/Matrix';

class Game extends React.Component {
  constructor() {
    super();
    this.surrender = this.surrender.bind(this);
    this.gameOver = this.gameOver.bind(this);
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
      <li>
        {event}
      </li>
    )
  }

  render() {
    const events = this.props.events;
    return (
      <div>
        <h2>Game running</h2>
        <div>
          <h3>My Ships</h3>
          <Matrix 
            data={this.props.playerBoard}
            setStyle={this.getStyle}/>
        </div>
        <div>
          <h3>Enemy Ships</h3>
          <Matrix 
            data={this.props.botBoard}
            setStyle={this.getStyle}
            onClick={this.props.playerShoots}/>
        </div>
        <div>
          <h3>Shoots</h3>
          <ul>
            {events.forEach(this.renderEvent)}
          </ul>
        </div>
        <div>
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
        </div>
      </div>
    )
  }
}

export default withRouter(Game);