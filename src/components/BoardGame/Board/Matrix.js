import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extend } from 'lodash';
import { matrixStyle, cellStyle } from './Styles.js';
import Column from './Column.js';
import Cell from './Cell.js';

export default class Matrix extends Component {

  constructor() {
    super();
    this.getCellStyle = this.getCellStyle.bind(this);
    this.generateCells = this.generateCells.bind(this);
  }

  getCellStyle(data) {
    let { setStyle, setHoverStyle } = this.props;
    let style = extend({}, cellStyle);
    if (setStyle) style = extend(style, setStyle(data));
    if (setHoverStyle) style = extend(style, {':hover': setHoverStyle(data)});
    return style;
  }

  generateCells(data) {
    const { setData, cellClass, onClick, onMouseOver, onMouseOut} = this.props;
    return data.map((col, i) => col.map((cell, j) => {
      // Using i and j to denote col and row respectively
      const curData = setData(cell, i, j)
      const style = this.getCellStyle(curData);
      return (<Cell 
        key={`col${i}row${j}`}
        className={cell.className}
        cellClass={cellClass}
        data={curData}
        style={style}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut} />);
    }));
  }

  render() {
    const { columnClass, matrixClass, data} = this.props;
    const cells = this.generateCells(data);
    return (
      <div
        className={matrixClass}
        style={matrixStyle}>
          {cells.map((col, i) =>
            <Column key={`col${i}`}
              className={columnClass}
              cells={col}/>)
          }
      </div>
    );
  }
}

Matrix.propTypes = {
  data: PropTypes.array, // A 2d array of values or objects
  setData: PropTypes.func, // A function that determines what the cell's value will be
  setStyle: PropTypes.func, // A function that determines the cell's style
  setHoverStyle: PropTypes.func, // A function that determines the cell's style
  onClick: PropTypes.func, // An event handler, triggered when cell is clicked
  onMouseOver: PropTypes.func, // An event handler, triggered when mouse enters cell
  onMouseOut: PropTypes.func, // An event handler, triggered when mouse exits cell,
  random: PropTypes.array, // [10, 5] would result in a 10 column, 5 row grid with random values between 1-100
  cellClass: PropTypes.string,
  columnClass: PropTypes.string,
  matrixClass: PropTypes.string,
};

Matrix.defaultProps = {
  setData: (cell, col, row) => cell, // Returns the value at data[col][row]
  cellClass: 'rm-cell', // Default cell class name to 'rm-cell'
  columnClass: 'rm-column', // Default column class name to 'rm-column'
  matrixClass: 'rm-matrix', // Default matrix class name to 'rm-matrix'
};

