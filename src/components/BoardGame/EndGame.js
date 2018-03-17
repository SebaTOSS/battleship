import React from 'react';
import { withRouter } from 'react-router-dom'

class EndGame extends React.Component {
  constructor() {
    super();
    this.restart = this.restart.bind(this);
  }
  
  restart(event) {
    this.props.restart();
    this.props.history.push(`/`);
  }

  render() {
    const result = this.props.result;
    return (
      <div className='w3-center'>
        <h2>Game over</h2>
        <h3>{result}</h3>
        <button onClick={this.restart} className='w3-button w3-theme'>Restart</button>
      </div>
    )
  }
}

export default withRouter(EndGame);