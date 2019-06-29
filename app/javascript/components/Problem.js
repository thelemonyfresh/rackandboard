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
    return this.props.boardLayout[0].length;
  }
  problemHeight() {
    return this.props.boardLayout.length;
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

    let problemLetter = this.props.boardLayout[y][x];
    let solutionLetter = this.state.solutionLayout[y][x];
    let emptyCell = !problemLetter && !solutionLetter;

    let newRackLetters = this.state.rackLetters;
    let newSolutionArray = this.state.solutionLayout;

    let rackLetterIndex = this.state.selectedRackLetter;
    let rackLetter = this.state.rackLetters[rackLetterIndex];

    let newSelectedIndex = null;

    // remove solution letter from board
    if (this.state.selectedRackLetter == null && solutionLetter) {
      console.log('blah');
      newSolutionArray[y][x] = null;
      newRackLetters.push(solutionLetter);
    };

    // place selected rack tile
    if (this.state.selectedRackLetter != null && emptyCell) {
      console.log('bleeeh');
      newRackLetters.splice(rackLetterIndex,1);
      newSolutionArray[y][x] = rackLetter;
      newSelectedIndex = rackLetterIndex;

      if (rackLetterIndex >= newRackLetters.length) {
        newSelectedIndex = newRackLetters.length;
      }
      if (newRackLetters.length == 0) newSelectedIndex = null;
    };

    this.setState({
      solutionLayout: newSolutionArray,
      rackLetters: newRackLetters,
      selectedRackLetter: newSelectedIndex
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
    //
    let cardWidth = this.refs.problemContainer.offsetWidth;
    let windowHeight = window.innerHeight;

    let tilesWide = Math.max(this.problemWidth(), this.props.initialRackLetters.length);

    let maxWidth = (cardWidth - 10) / tilesWide;
    let maxHeight = (windowHeight) / (this.problemHeight() + 2);
    return Math.min(maxWidth, maxHeight);
  };

  rackClickHandler(e) {
    let letterIndex = parseInt(e.target.dataset.rackPosition);
    console.log(`li: ${letterIndex}`);
    letterIndex = this.state.selectedRackLetter != null ? null : letterIndex;
    this.setState({selectedRackLetter: letterIndex});
  };

  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-10 col-sm-11 col-xs-12'>
            <div className='card' ref='problemContainer'>
              <div className='card-body'>
                <Board
                  boardLayout={this.props.boardLayout}
                  solutionLayout={this.state.solutionLayout}
                  clickHandler={this.boardClickHandler}
                  cellSize={this.state.cellSize || 0}
                />
              </div>
              <div className='card-footer'>
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
