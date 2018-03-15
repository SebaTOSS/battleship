import React from 'react';
import { withRouter } from 'react-router-dom'
import Matrix from './board/Matrix';

class Game extends React.Component {
  constructor() {
    super();
    this.surrender = this.surrender.bind(this);
  }

  surrender(event) {
    event.preventDefault();
    this.props.surrender();
    this.props.history.push(`/end`);
  }

  getStyle() {
    return {
      backgroundColor: '#d4d4d4',
      border: '1px solid #1a1a1a'
    }
  }

  render() {
    return (
      <div>
        <h2>Game running</h2>
        <div>
          <p>My Ships</p>
          <Matrix 
            data={this.props.playerBoard}
            setStyle={this.getStyle}/>
        </div>
        <div>
          <p>Enemy Ships</p>
          <Matrix 
            data={this.props.botBoard}
            setStyle={this.getStyle}
            onClick={this.props.playerShoots}/>
        </div>
        <button onClick={this.surrender}>Surrender</button>
      </div>
    )
  }
}

export default withRouter(Game);