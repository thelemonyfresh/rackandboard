import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class BoardCell extends React.Component {
  problemLetter() {
    return this.props.problemLayout[this.props.y][this.props.x];
  }

  solutionLetter() {
    return this.props.solutionLayout[this.props.y][this.props.x];
  }

  getTile() {
    let letter = this.problemLetter() || this.solutionLetter();
    if (letter) {
      return <Tile problemTile={!!this.problemLetter()}
                letter={letter}/> ;
    };
    return '';
  };

  render () {
    return (
      <td className='board-cell'
          data-x={this.props.x}
          data-y={this.props.y}
          onClick={this.props.clickHandler}>
        {this.getTile()}
      </td>
    );
  }
}

export default BoardCell;