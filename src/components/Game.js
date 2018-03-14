import React from 'react';
import { withRouter } from 'react-router-dom'

class Game extends React.Component {
  constructor() {
    super();
    this.surrender = this.surrender.bind(this);
    this.playerWins = this.playerWins.bind(this);
    this.pcWins = this.pcWins.bind(this);
  }

  surrender(event) {
    event.preventDefault();
    this.props.surrender();
    this.props.history.push(`/end`);
  }

  playerWins(event) {
    event.preventDefault();
    this.props.setWinner(true);
    this.props.history.push(`/end`);
  }

  pcWins(event) {
    event.preventDefault();
    this.props.setWinner(false);
    this.props.history.push(`/end`);
  }

  render() {
    return (
      <div>
        <h2>Game running</h2>
        <p>AA</p>
        <button onClick={this.surrender}>Surrender</button>
        <button onClick={this.playerWins}>Player Wins</button>
        <button onClick={this.pcWins}>PC Wins</button>
      </div>
    )
  }
}

export default withRouter(Game);