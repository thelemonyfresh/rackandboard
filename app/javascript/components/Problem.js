import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.solution = null;
    this.selectedRackLetterHandler = this.selectedRackLetterHandler.bind(this);
   // this.placeRackLetterHandler = this.placeRackLetterHandler.bind(this);
  }

  state = {
    rackLetters: this.props.initialRackLetters,
    solution: null,
    selectedRackLetter: null
  }

  selectedRackLetterHandler(tileKey) {
    let newKey = tileKey == this.state.selectedRackLetter ? null : tileKey;
    this.setState({selectedRackLetter: newKey});
  }

  render () {
    return (
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
            <Board layout={this.props.boardLayout}/>
          </div>
          <div className='card-footer'>
            {console.log(this.state.rackLetters)}
            <Rack letters={this.state.rackLetters}
                  letterClickHandler={this.selectedRackLetterHandler}
                  selectedLetter={this.state.selectedRackLetter}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
