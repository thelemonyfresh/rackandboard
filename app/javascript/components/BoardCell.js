import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class BoardCell extends React.Component {
  problemLetter() {
    return this.props.boardLayout[this.props.y][this.props.x];
  }

  solutionLetter() {
    return this.props.solutionLayout[this.props.y][this.props.x];
  }

  getTile() {
    let letter = this.problemLetter() || this.solutionLetter();
    if (letter) {
      return <Tile
               problemTile={!!this.problemLetter()}
               letter={letter}
               boardPositionX={this.props.x}
               boardPositionY={this.props.y}
               clickHandler={this.props.clickHandler}
               cellSize={this.props.cellSize}
             /> ;
    };
    return '';
  };

  render () {
    return (
      <td
        className='board-cell'
        data-board-position-x={this.props.x}
        data-board-position-y={this.props.y}
        onClick={this.props.clickHandler}
        style={{width: this.props.cellSize, height: this.props.cellSize}}
      >
        {this.getTile()}
      </td>
    );
  }
}

export default BoardCell;
