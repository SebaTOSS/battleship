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
    const background = (result === 'WON')? '/css/images/won.jpg' : '/css/images/defeat.jpg';
    const style = {
      backgroundImage: `url(${background})`,
    };
    return (
      <div className='w3-center'
        style= {style}>
        <h2>Game over</h2>
        <h3>{result}</h3>
        <button 
          className='w3-button w3-theme'
          onClick={this.restart}>
          Restart
        </button>
      </div>
    )
  }
}

export default withRouter(EndGame);