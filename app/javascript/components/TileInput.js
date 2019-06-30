import React from "react";
import PropTypes from "prop-types";

class TileInput extends React.Component {
  render () {
    return (
      <input
        style={{ width: this.props.cellSize - 10, height: this.props.cellSize - 10, lineHeight: `${this.props.cellSize - 10}px`, fontSize: `${(this.props.cellSize - 10) * 0.75}px` }}
        autoFocus
        className={"tile"}
        data-board-position-x={this.props.boardPositionX}
        data-board-position-y={this.props.boardPositionY}
        onKeyPress={this.props.inputHandler}
        onBlur={this.props.blurHandler}
      />
    );
  }
}

export default TileInput;
