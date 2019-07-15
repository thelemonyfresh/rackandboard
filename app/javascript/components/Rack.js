import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";
import TileInput from "./TileInput";

class Rack extends React.Component {
  getLetters() {
    let letters = [];
    console.log(this.props);
    this.props.letters.forEach((letter,i)=>{
      let tileKey = letter + i.toString();
      if (letter == '+') {
        letters.push(
          <TileInput
            key={tileKey}
            cellSize={this.props.cellSize}
            inputHandler={this.props.tileInputHandler}
            blurHandler={this.props.blurHandler}
          />
        );
      } else {
        letters.push(
          <Tile
            letter={letter}
            key={tileKey}
            rackPosition={i}
            selected={this.props.selectedLetter == i}
            clickHandler={this.props.clickHandler}
            cellSize={this.props.cellSize}
          />
        );
      }
    });
    return letters;
  }

  render () {
    return (
      <div className='row justify-content-center'>
        {this.getLetters()}
      </div>
    );
  }
}

export default Rack;
