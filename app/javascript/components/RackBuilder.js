import React from "react";
import PropTypes from "prop-types";
import Rack from "./Rack";
import Tile from "./Tile";

class RackBuilder extends React.Component {
  render () {
    if (this.props.rackLetters.length == 0) {
      return (
        <div onClick={this.props.clickHandler}>
          Click to add letters to the rack.
        </div>
      );
    }
    return (
      <React.Fragment>
        <Rack
          letters={this.props.rackLetters}
          clickHandler={this.props.clickHandler}
          tileInputHandler={this.props.tileInputHandler}
          blurHandler={this.props.blurHandler}
          cellSize={this.props.cellSize}
        />
        <button
          onClick={this.props.clickHandler}
        >
          +
        </button>
      </React.Fragment>
    );
  }
}

export default RackBuilder;
