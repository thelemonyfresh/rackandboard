import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class Rack extends React.Component {
  getLetters() {
    let letters = [];
    console.log(this.props);
    this.props.letters.forEach((e,i)=>{
      let tileKey = e + i.toString();
      letters.push(
        <Tile
          letter={e}
          key={tileKey}
          rackPosition={i}
          selected={this.props.selectedLetter == i}
          clickHandler={this.props.clickHandler}
          cellSize={this.props.cellSize}
        />
      );
    });
    return letters;
  }

  render () {
    return (
      <div className='row justify-content-center'>{this.getLetters()}</div>
    );
  }
}

export default Rack;
