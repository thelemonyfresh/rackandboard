import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

class BoardBuilder extends React.Component {
  render () {
   return (
      <div>
        <Board
          boardLayout={this.props.boardLayout}
          clickHandler={this.props.clickHandler}
          tileInputHandler={this.props.tileInputHandler}
          blurHandler={this.props.blurHandler}
          cellSize={this.props.cellSize}
        />
      </div>
    );
  }
}

export default BoardBuilder;
