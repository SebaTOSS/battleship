import React from 'react';
import { withRouter } from 'react-router-dom'

class EndGame extends React.Component {
  constructor() {
    super();
    this.restart = this.restart.bind(this);
  }
  restart(event) {
    event.preventDefault();
    this.props.history.push(`/`);
  }
  render() {
    const winner = this.props.winner;
    return (
      <div>
        <h2>Game over</h2>
        <h3>{winner}</h3>
        <button onClick={this.restart}>Restart</button>
      </div>
    )
  }
}

export default withRouter(EndGame);