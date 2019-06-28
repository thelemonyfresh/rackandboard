import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class BoardCell extends React.Component {
  problemLetter() {
    return this.props.problemLayout[this.props.x][this.props.y];
  }

  solutionLetter() {
    return this.props.solutionLayout[this.props.x][this.props.y];
  }

  getTile() {
    let letter = this.problemLetter() || this.solutionLetter();

    return <Tile problemTile={!!this.problemLetter()}
                 letter={letter}/> ;
  }

  render () {
    return (
      <td className='board-cell'>
        {this.getTile()}
      </td>
    );
  }
}

export default BoardCell;
