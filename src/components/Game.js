import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './board/Matrix';

class Game extends React.Component {
  constructor() {
    super();
    this.surrender = this.surrender.bind(this);
    this.playerWins = this.playerWins.bind(this);
    this.pcWins = this.pcWins.bind(this);
    this.shoot = this.shoot.bind(this);
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

  shoot(data, cell) {
    console.log(data);
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
        <h2>Game running</h2>
        <p>My Ships</p>
        <Matrix 
          random={[10, 10]}
          setStyle={this.getStyle}
          onClick={this.shoot}/>
        <p>Enemy Ships</p>
        <Matrix 
          random={[10, 10]}
          setStyle={this.getStyle}/>
        <button onClick={this.surrender}>Surrender</button>
        <button onClick={this.playerWins}>Player Wins</button>
        <button onClick={this.pcWins}>PC Wins</button>
      </div>
    )
  }
}

export default withRouter(Game);