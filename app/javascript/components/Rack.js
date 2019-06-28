import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class Rack extends React.Component {
  getLetters() {
    let letters = [];
    this.props.letters.forEach((e)=>{
      letters.push(
       <Tile letter={e}/>
      );
    });
    return letters;
  }

  render () {
    return (
      <div className='row'>{this.getLetters()}</div>
    );
  }
}

export default Rack;
