import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";
import ProblemContainer from "./ProblemContainer";
import ax from "packs/axios";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.rackClickHandler = this.rackClickHandler.bind(this);
    this.boardClickHandler = this.boardClickHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.solutionSubmitHandler = this.solutionSubmitHandler.bind(this);
  }

  state = {
    rackLetters: this.props.initialRackLetters,
    solutionLayout: [...Array(this.problemHeight())].map(x=>Array(this.problemWidth()).fill('')),
    selectedRackLetter: null,
    cellSize: 0
  }

  //
  // Lifecycle
  //

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    // TODO: sigh figure out how to not do this
    const timer = setTimeout(() => {
      this.updateDimensions();
    }, 1);
    return () => clearTimeout(timer);
  };


  //
  // Helpers
  //

  problemWidth() {
    return this.props.boardLayout[0].length;
  }
  problemHeight() {
    return this.props.boardLayout.length;
  };


  updateDimensions() {
    console.log("update dimensions");
    this.setState({cellSize: this.cellSize()});
  };

  cellSize() {
    console.log("calling cellsize");
    let cardWidth = this.refs.problemContainer.state.boardWidth;
    let cardHeight = this.refs.problemContainer.state.boardHeight;

    let tilesWide = Math.max(this.problemWidth(), this.props.initialRackLetters.length);
    let tilesHigh = this.problemHeight() + 1;

    let maxWidth = cardWidth / tilesWide;
    let maxHeight = cardHeight / tilesHigh;

    return Math.min(maxWidth, maxHeight);
  };

  //
  // Handlers
  //

  boardClickHandler(e) {
    e.stopPropagation();
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
      newSolutionArray[y][x] = '';
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

  rackClickHandler(e) {
    let letterIndex = parseInt(e.target.dataset.rackPosition);
    letterIndex = this.state.selectedRackLetter != null ? null : letterIndex;
    this.setState({selectedRackLetter: letterIndex});
  };

  solutionSubmitHandler(e) {
    console.log("submit");

    ax.post('/solutions', {
      solution: {
        problem_id: this.props.problem_id,
        layout: this.state.solutionLayout
      }
    }).then(res => {
      console.log("response");
      console.log(res);
    });
  };

  //
  // Render
  //

  render () {
    const board = <Board
                    boardLayout={this.props.boardLayout}
                    solutionLayout={this.state.solutionLayout}
                    clickHandler={this.boardClickHandler}
                    cellSize={this.state.cellSize}
                  />;

    const rack = <Rack
                   letters={this.state.rackLetters}
                   clickHandler={this.rackClickHandler}
                   selectedLetter={this.state.selectedRackLetter}
                   cellSize={this.state.cellSize}
                 />;

    const sideBar = <div className='card'>
                      <div className='card-body'>
                        <button
                          type="button"
                          className='btn btn-primary'
                          onClick={this.solutionSubmitHandler}
                        >
                          Submit Solution
                        </button>
                      </div>
                    </div>;

    return (
      <ProblemContainer
        ref='problemContainer'
        board={board}
        rack={rack}
        sidebar={sideBar}
      />
    );
  }
}

export default Problem;
