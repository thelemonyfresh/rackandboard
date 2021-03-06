import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";
import ProblemContainer from "./ProblemContainer";

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

    // TODO: sigh figure out how to not do this
    const timer = setTimeout(() => {
      this.updateDimensions();
    }, 1);
    return () => clearTimeout(timer);
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

  rackClickHandler(e) {
    let letterIndex = parseInt(e.target.dataset.rackPosition);
    letterIndex = this.state.selectedRackLetter != null ? null : letterIndex;
    this.setState({selectedRackLetter: letterIndex});
  };

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

    const sidebar = <div>this is the sidebar</div>;

    return (
      <ProblemContainer
        ref='problemContainer'
        board={board}
        rack={rack}
        sidebar={sidebar}
      />
    );
  }
}

export default Problem;
