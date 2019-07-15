import React from "react";
import PropTypes from "prop-types";
import Rack from "./Rack";
import Tile from "./Tile";

class RackBuilder extends React.Component {
  addButton() {
    if (!this.props.rackLetters.includes('+')) {
      return (
        <button
          className="btn btn-secondary ml-4"
          onClick={this.props.clickHandler}
        >
          +
        </button>
      );
    };
  };

  render () {
    if (this.props.rackLetters.length == 0) {
      return (
        <div onClick={this.props.clickHandler}>
          Click to add letters to the rack.
        </div>
      );
    }
    return (
      <div className="row justify-content-center">
        <Rack
          letters={this.props.rackLetters}
          clickHandler={this.props.clickHandler}
          tileInputHandler={this.props.tileInputHandler}
          blurHandler={this.props.blurHandler}
          cellSize={this.props.cellSize}
        />
        {this.addButton()}
      </div>
    );
  }
}

export default RackBuilder;
