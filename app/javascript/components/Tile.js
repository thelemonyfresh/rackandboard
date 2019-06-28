import React from "react";
import PropTypes from "prop-types";

class Tile extends React.Component {
  render () {
    return (
      <div className='card tile'>
        <div className='card-body p-1 text-center'>
          <h1>{this.props.letter}</h1>
        </div>
      </div>
    );
  }
}

export default Tile;
