import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <Board layout={this.props.boardLayout}/>
          </div>
          <div className='card-footer'>
            <Rack letters={this.props.rackLetters}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
