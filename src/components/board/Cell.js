import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

class Cell extends Component {

	constructor() {
		super();
		this.getClickHandler = this.getClickHandler.bind(this);
		this.getMouseOverHandler = this.getMouseOverHandler.bind(this);
		this.getMouseOutHandler = this.getMouseOutHandler.bind(this);
		this.setBackgroundColor = this.setBackgroundColor.bind(this);
	}

	getClickHandler(data) {
		const { onClick } = this.props;
		if (!onClick) return false;
		onClick(data, this);
		this.forceUpdate();
	}

	getMouseOverHandler(data) {
		const { onMouseOver } = this.props;
		if (!onMouseOver) return false;
		return onMouseOver(data);
	}

	getMouseOutHandler(data) {
		const { onMouseOut } = this.props;
		if (!onMouseOut) return false;
		return onMouseOut(data);
	}
	
	setBackgroundColor(color) {
		this.props.style.backgroundColor = color;
		this.forceUpdate();
	}

	render() {
		const {data, style, className} = this.props;
		return (
			<div
				className={className}
				style={style}
				onClick={()=> {this.getClickHandler(data)}}
				onMouseOver={()=> {this.getMouseOverHandler(data)}}
				onMouseOut={()=> {this.getMouseOutHandler(data)}}>
			</div>
		);
	}
}

Cell.propTypes = {
	data: PropTypes.object, // This cell's data
	style: PropTypes.object, // This cell's style object
	onClick: PropTypes.func, // This cell's click handler
	onMouseOver: PropTypes.func, // This cell's mouseover handler
	onMouseOut: PropTypes.func, // This cell's mouseout handler
	className: PropTypes.string, // Cell's class
};

export default Radium(Cell); // Wraps Cell in Radium, which extends React's inline CSS capabilities
