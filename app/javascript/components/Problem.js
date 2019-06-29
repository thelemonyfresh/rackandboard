import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.rackClickHandler = this.rackClickHandler.bind(this);
    this.boardClickHandler = this.boardClickHandler.bind(this);
  }

  problemWidth() {
    return this.props.problemLayout[0].length;
  }
  problemHeight() {
    return this.props.problemLayout.length;
  };

  state = {
    rackLetters: this.props.initialRackLetters,
    solutionLayout: [...Array(this.problemHeight())].map(x=>Array(this.problemWidth()).fill(null)),
    selectedRackLetter: null
  }

  boardClickHandler(e) {
    console.log(e.target.dataset);
    let x = e.target.dataset.boardPositionX;
    let y = e.target.dataset.boardPositionY;

    let problemLetter = this.props.problemLayout[y][x];
    let solutionLetter = this.state.solutionLayout[y][x];
    console.log(`solution letter: ${solutionLetter}`);
    let emptyCell = !problemLetter && !solutionLetter;

    let newRackLetters = this.state.rackLetters;
    let newSolutionArray = this.state.solutionLayout;

    let rackLetterIndex = this.state.selectedRackLetter;
    let rackLetter = this.state.rackLetters[rackLetterIndex];

    // remove solution letter from board
    if (!this.state.selectedRackLetter && solutionLetter) {
      console.log("remove");
      newSolutionArray[y][x] = null;
      newRackLetters.push(solutionLetter);
    };

    // place selected rack tile
    if (this.state.selectedRackLetter && emptyCell) {
      newRackLetters.splice(rackLetterIndex,1);
      newSolutionArray[y][x] = rackLetter;
    };

    this.setState({
      solutionLayout: newSolutionArray,
      rackLetters: newRackLetters,
      selectedRackLetter: null
    });
  }

  rackClickHandler(e) {
    console.log(this.state.selectedRackLetter);
    let letterIndex = parseInt(e.target.dataset.rackPosition);
    letterIndex = this.state.selectedRackLetter ? null : letterIndex;
    this.setState({selectedRackLetter: letterIndex});
  }

  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <div className='card-title'>Board:</div>
              <Board
                problemLayout={this.props.problemLayout}
                solutionLayout={this.state.solutionLayout}
                clickHandler={this.boardClickHandler}
              />
            </div>
            <div className='card-footer'>
              <div className='card-title'>Rack:</div>
              <Rack
                letters={this.state.rackLetters}
                clickHandler={this.rackClickHandler}
                selectedLetter={this.state.selectedRackLetter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
