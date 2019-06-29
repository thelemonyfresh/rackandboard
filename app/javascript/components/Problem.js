import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.rackClickHandler = this.rackClickHandler.bind(this);
    this.boardClickHandler = this.boardClickHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
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
    selectedRackLetter: null,
    cellSize: 0
  }

  boardClickHandler(e) {
    let x = e.target.dataset.boardPositionX;
    let y = e.target.dataset.boardPositionY;

    let problemLetter = this.props.problemLayout[y][x];
    let solutionLetter = this.state.solutionLayout[y][x];
    let emptyCell = !problemLetter && !solutionLetter;

    let newRackLetters = this.state.rackLetters;
    let newSolutionArray = this.state.solutionLayout;

    let rackLetterIndex = this.state.selectedRackLetter;
    let rackLetter = this.state.rackLetters[rackLetterIndex];

    // remove solution letter from board
    if (!this.state.selectedRackLetter && solutionLetter) {
      newSolutionArray[y][x] = null;
      newRackLetters.push(solutionLetter);
    };

    // place selected rack tile
    if (this.state.selectedRackLetter != null && emptyCell) {
      newRackLetters.splice(rackLetterIndex,1);
      newSolutionArray[y][x] = rackLetter;
    };

    this.setState({
      solutionLayout: newSolutionArray,
      rackLetters: newRackLetters,
      selectedRackLetter: null
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  };

  updateDimensions() {
    this.setState({cellSize: this.cellSize()});
  };

  cellSize(width) {
    let cardWidth = this.refs.problemContainer.offsetWidth;
    let windowHeight = window.innerHeight;

    let maxWidth = (cardWidth - 10) / this.problemWidth();
    let maxHeight = (windowHeight) / (this.problemHeight() + 2);
    return Math.min(maxWidth, maxHeight);
  };

  rackClickHandler(e) {
    let letterIndex = parseInt(e.target.dataset.rackPosition);
    letterIndex = this.state.selectedRackLetter ? null : letterIndex;
    this.setState({selectedRackLetter: letterIndex});
  };

  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-10 col-sm-11 col-xs-12'>
            <div className='card' ref='problemContainer'>
              <div className='card-body'>
                <div className='card-title'>Board:</div>
                <Board
                  problemLayout={this.props.problemLayout}
                  solutionLayout={this.state.solutionLayout}
                  clickHandler={this.boardClickHandler}
                  cellSize={this.state.cellSize || 0}
                />
              </div>
              <div className='card-footer'>
                <div className='card-title'>Rack:</div>
                <Rack
                  letters={this.state.rackLetters}
                  clickHandler={this.rackClickHandler}
                  selectedLetter={this.state.selectedRackLetter}
                  cellSize={this.state.cellSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
