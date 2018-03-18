import React from 'react';
import { withRouter } from 'react-router-dom';
import BackgroundImage from 'react-background-image-loader';

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
    const image = (result === 'WON')? 'WON': 'LOST';
    const path = require(`../../css/images/${image}.jpg`)
    const style = {
      'height':'20%',
      'marginTop': '20px'
    };
    return (
      <BackgroundImage 
        src={path}
        placeholder={path}
        className='background-image' >
        <div className='w3-center expanded'>
          <img 
            src={require('../../css/images/game-over.png')}
            alt='Game Over'
            style={style} />
          <h3>{result}</h3>
          <button 
            className='w3-button w3-theme'
            onClick={this.restart}>
            Restart
          </button>
        </div>
      </BackgroundImage>
    )
  }
}

export default withRouter(EndGame);