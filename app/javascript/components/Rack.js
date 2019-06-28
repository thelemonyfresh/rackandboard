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
          selected={this.props.selectedLetter == tileKey}
          clickHandler={()=>this.props.letterClickHandler(tileKey)}/>
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
