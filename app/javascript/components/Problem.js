import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import Rack from "./Rack";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.selectedRackLetterHandler = this.selectedRackLetterHandler.bind(this);
   // this.placeRackLetterHandler = this.placeRackLetterHandler.bind(this);
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

  selectedRackLetterHandler(tileKey) {
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
                     solutionLayout={this.state.solutionLayout}/>
            </div>
            <div className='card-footer'>
              {console.log(this.state.rackLetters)}
              <Rack letters={this.state.rackLetters}
                    letterClickHandler={this.selectedRackLetterHandler}
                    selectedLetter={this.state.selectedRackLetter}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
