import React from "react";
import PropTypes from "prop-types";

class Tile extends React.Component {
  draggable() {
    return this.props.problemTile ? false : true;
  };

  bgColor() {
    if (this.props.problemTile) {
      return 'bg-secondary';
    };
    if (this.props.selected) {
      return 'bg-primary';
    };
    return 'bg-light';
  };

  render () {
    return (
      <div draggable={this.draggable()}
           className={"tile "+ this.bgColor()}
           onClick={this.props.clickHandler}
           data-rack-position={this.props.rackPosition}
           data-board-position-x={this.props.boardPositionX}
           data-board-position-y={this.props.boardPositionY}
      >
        {this.props.letter}
      </div>
    );
  }
}

export default Tile;
