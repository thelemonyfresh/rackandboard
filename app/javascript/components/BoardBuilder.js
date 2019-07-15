import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

class BoardBuilder extends React.Component {
  render () {
    return (
      <React.Fragment>
          <div className='col-11 p-0'>
            <Board
              boardLayout={this.props.boardLayout}
              clickHandler={this.props.clickHandler}
              tileInputHandler={this.props.tileInputHandler}
              blurHandler={this.props.blurHandler}
              cellSize={this.props.cellSize}
            />
          </div>
      </React.Fragment>
    );
  }
}

export default BoardBuilder;
