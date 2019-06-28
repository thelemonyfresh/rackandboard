import React from "react";
import PropTypes from "prop-types";
import BoardCell from "./BoardCell";

class Board extends React.Component {
  createGrid = () => {
    let table = [];

    //rows
    for(let i = 0; i < this.props.problemLayout.length; i++) {
      let row = [];
      // columns
      for(let j = 0; j < this.props.problemLayout[0].length; j++) {
        row.push(
          <BoardCell key={j}
                     x={i}
                     y={j}
                     problemLayout={this.props.problemLayout}
                     solutionLayout={this.props.solutionLayout}/>
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
