import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.selectRackLetterHandler = this.selectRackLetterHandler.bind(this);
    this.placeRackLetterHandler = this.placeRackLetterHandler.bind(this);
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

  placeRackLetterHandler(e) {
    console.log(e.target);
    if (this.state.selectedRackLetter) {
      let letterChar = this.state.selectedRackLetter.substr(0,1);
      let letterIndex = parseInt(this.state.selectedRackLetter.substr(1,2));

      let newRackLetters = this.state.rackLetters;
      newRackLetters.splice(letterIndex);

      let solutionArray = this.state.solutionLayout;
      solutionArray[e.target.dataset.y][e.target.dataset.x] = letterChar;
      this.setState({
        solutionLayout: solutionArray,
        rackLetters: newRackLetters
      });
    }
  }

  selectRackLetterHandler(tileKey) {
    let newKey = tileKey == this.state.selectedRackLetter ? null : tileKey;
    this.setState({selectedRackLetter: newKey});
  }

  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <Board problemLayout={this.props.problemLayout}
                     solutionLayout={this.state.solutionLayout}
                     cellClickHandler={this.placeRackLetterHandler}/>
            </div>
            <div className='card-footer'>
              {console.log(this.state.rackLetters)}
              <Rack letters={this.state.rackLetters}
                    letterClickHandler={this.selectRackLetterHandler}
                    selectedLetter={this.state.selectedRackLetter}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
