import React from "react";
import BoardBuilder from './BoardBuilder';
import RackBuilder from './RackBuilder';
import ProblemContainer from './ProblemContainer';
import BoardSizeControls from './BoardSizeControls';
import PropTypes from "prop-types";

class ProblemCreator extends React.Component {
  constructor(props) {
    super(props);
    this.boardClickHandler = this.boardClickHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.boardInputHandler = this.boardInputHandler.bind(this);
    this.rackInputHandler = this.rackInputHandler.bind(this);
    this.rackClickHandler = this.rackClickHandler.bind(this);
    this.rackBlurHandler = this.rackBlurHandler.bind(this);
    this.boardBlurHandler = this.boardBlurHandler.bind(this);
    this.addOrRemoveRow = this.addOrRemoveRow.bind(this);
    this.addOrRemoveColumn = this.addOrRemoveColumn.bind(this);
  }

  defaultBoardLayout = [...Array(7)].map(x=>Array(7).fill(null));

  state = {
    boardLayout: this.props.initialBoardLayout || this.defaultBoardLayout,
    rackLetters: this.props.initialRackLetters || []
  }

  boardClickHandler(e) {
    // stop propagating events
    e.stopPropagation();

    let newBoardLayout = this.state.boardLayout;

    if (!e.target.dataset.boardPositionX ) return;
    let x = e.target.dataset.boardPositionX;
    let y = e.target.dataset.boardPositionY;

    let problemLetter = this.state.boardLayout[y][x];

    console.log(`pl: ${problemLetter}`);

    if ( problemLetter == null) {
      newBoardLayout[y][x] = "+";
    } else {
      newBoardLayout[y][x] = null;
    };

    this.setState({boardLayout: newBoardLayout});
  }

  boardInputHandler(e) {
    let x = e.target.dataset.boardPositionX;
    let y = e.target.dataset.boardPositionY;

    let char = this.validCharOrNull(e.key.toLowerCase());
    let newBoardLayout = this.state.boardLayout;

    newBoardLayout[y][x] = char;

    this.setState({boardLayout: newBoardLayout});
  }

  boardBlurHandler(e) {
    let newBoardLayout = this.state.boardLayout;
    newBoardLayout.forEach((row, y)=>{
      row.forEach((letter, x)=>{
        if (letter == '+') newBoardLayout[y][x] = null;
      });
    });
    this.setState({boardLayout: newBoardLayout});
  }

  rackClickHandler(e) {
    let newRackLetters = this.state.rackLetters;
    if (e.target.dataset.rackPosition != null) {
      newRackLetters.splice(e.target.dataset.rackPosition, 1);
    } else {
      newRackLetters.push('+');
    }

    this.setState({rackLetters: newRackLetters});
  }

  rackInputHandler(e) {
    let char = this.validCharOrNull(e.key.toLowerCase());
    let newRackLetters = this.state.rackLetters;
    console.log(newRackLetters);

    // remove plus
    if (newRackLetters.indexOf('+') >= 0) {
      newRackLetters.splice(newRackLetters.indexOf('+'), 1);
    }

    if (char != null) newRackLetters.push(char);
    console.log(newRackLetters);
    this.setState({rackLetters: newRackLetters});
  }

  rackBlurHandler(a) {
    let newRackLetters = this.state.rackLetters;

    // remove plus
    if (newRackLetters.indexOf('+') >= 0) {
      newRackLetters.splice(newRackLetters.indexOf('+'), 1);
    }
    this.setState({rackLetters: newRackLetters});
  }

  validCharOrNull(char) {
    if (char.length == 1 && char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123) {
      return char;
    } else {
      return null;
    }
  }

  addOrRemoveRow(e) {
    let newLayout = this.state.boardLayout;

    console.log(newLayout.length);
    console.log(e.target.dataset);

    if (e.target.dataset.rowAdd && newLayout.length < 10) {
      newLayout.push(Array(newLayout[0].length).fill(null));
    }
    if (e.target.dataset.rowRemove && newLayout.length > 2) {
      newLayout.pop();
    }
    this.setState({boardLayout: newLayout, cellSize: this.cellSize()});
  }

  addOrRemoveColumn(e) {
    let newLayout = this.state.boardLayout;

    if (e.target.dataset.columnAdd && newLayout[0].length < 10) {
      newLayout.forEach((row)=>row.push(null));
    }
    if (e.target.dataset.columnRemove && newLayout[0].length > 2) {
      newLayout.forEach((row)=>row.pop());
    }
    this.setState({boardLayout: newLayout, cellSize: this.cellSize()});
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    // TODO: sigh figure out how to not do this
    const timer = setTimeout(() => {
      this.updateDimensions();
    }, 1);
    return () => clearTimeout(timer);
  };

  componentDidUpdate() {
    this.refs.boardLayoutInput.value = JSON.stringify(this.state.boardLayout);
    this.refs.rackLettersInput.value = JSON.stringify(this.state.rackLetters);
    console.log(this.state);
  };

  updateDimensions() {
    this.setState({cellSize: this.cellSize()});
  };

  cellSize() {
    console.log("cellsizing");
    let cardWidth = this.refs.problemContainer.state.boardWidth;
    let cardHeight = this.refs.problemContainer.state.boardHeight;

    let tilesWide = Math.max(this.state.boardLayout[0].length, this.state.rackLetters.length);
    let tilesHigh = this.state.boardLayout.length + 1.5;

    let maxWidth = (cardWidth) / (tilesWide);
    let maxHeight = (cardHeight) / (tilesHigh);

    return Math.min(maxWidth, maxHeight);
  };

  render () {
    const board = <BoardBuilder
                    boardLayout={this.state.boardLayout}
                    clickHandler={this.boardClickHandler}
                    tileInputHandler={this.boardInputHandler}
                    blurHandler={this.boardBlurHandler}
                    cellSize={this.state.cellSize}
                    rowClickHandler={this.addOrRemoveRow}
                    columnClickHandler={this.addOrRemoveColumn}
                  />;

    const rack = <RackBuilder
                   rackLetters={this.state.rackLetters}
                   clickHandler={this.rackClickHandler}
                   tileInputHandler={this.rackInputHandler}
                   blurHandler={this.rackBlurHandler}
                   cellSize={this.state.cellSize}
                 />;

    const sideBar = <div className='card'>
                      <div className='card-body'>
                        <input
                          type="hidden"
                          ref='boardLayoutInput'
                          name="problem[board_attributes][layout]"
                        />
                        <input
                          type="hidden"
                          ref='rackLettersInput'
                          name="problem[letter_rack_attributes][letters]"
                        />
                        <BoardSizeControls
                          columnHandler={this.addOrRemoveColumn}
                          rowHandler={this.addOrRemoveRow}
                          numRows={this.state.boardLayout[0].length}
                          numCols={this.state.boardLayout.length}
                        />
                      </div>
                      <div className='card-footer'>
                        <button
                          type="submit"
                          className='btn btn-primary'
                        >
                          Submit Problem
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

export default ProblemCreator;
