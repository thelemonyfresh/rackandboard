import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";

class Board extends React.Component {
  createGrid = () => {
    let table = [];

    //rows
    for(let i = 0; i < this.props.layout.length; i++) {
      let row = [];
      // columns
      for(let j = 0; j < this.props.layout[0].length; j++) {
        row.push(
          <td className='board-cell' key={j}>
            {this.letterTile(this.props.layout[i][j])}
          </td>
        );
      }
      table.push(<tr key={i}>{row}</tr>);
    }

    return table;
  };

  letterTile(letter) {
    if (letter.length == 0) return '';
    return <Tile letter={letter}/> ;
  }

  render () {
    return (
      <table>
        <tbody>
          {this.createGrid()}
        </tbody>
      </table>
    );
  }
}

export default Board;
