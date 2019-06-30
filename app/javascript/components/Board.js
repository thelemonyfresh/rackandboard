import React from "react";
import PropTypes from "prop-types";
import BoardCell from "./BoardCell";

class Board extends React.Component {
  createGrid = () => {
    let table = [];

    //rows
    for(let i = 0; i < this.props.boardLayout.length; i++) {
      let row = [];
      // columns
      for(let j = 0; j < this.props.boardLayout[0].length; j++) {
        row.push(
          <BoardCell
            key={j}
            x={j}
            y={i}
            boardLayout={this.props.boardLayout}
            solutionLayout={this.props.solutionLayout}
            clickHandler={this.props.clickHandler}
            tileInputHandler={this.props.tileInputHandler}
            blurHandler={this.props.blurHandler}
            cellSize={this.props.cellSize}
          />
        );
      }
      table.push(<tr key={i}>{row}</tr>);
    }

    return table;
  };

  render () {
    return (
      <div className='row justify-content-center'>
        <table>
          <tbody>
            {this.createGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
