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
           className={"card tile shadow "+ this.bgColor()}
           onClick={this.props.clickHandler}>
        <div className='card-body p-1 text-center'>
          <h1>{this.props.letter}</h1>
        </div>
      </div>
    );
  }
}

export default Tile;
