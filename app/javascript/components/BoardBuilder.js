import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

class BoardBuilder extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-11 p-0'>
            <Board
              boardLayout={this.props.boardLayout}
              clickHandler={this.props.clickHandler}
              tileInputHandler={this.props.tileInputHandler}
              blurHandler={this.props.blurHandler}
              cellSize={this.props.cellSize}
            />
          </div>
          <div className='col-1 p-0 my-auto'>
            <div className="btn-group-vertical ml-1"
                 role="group"
                 aria-label="row"
                 onClick={this.props.rowClickHandler}
            >
              <button
                className='btn btn-secondary'
                data-row-remove={true}
                type="button"
              >
                -
              </button>
              <button
                className='btn btn-secondary'
                data-row-add={true}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-11 p-0'>
            <div className='row justify-content-center'>
              <div className="btn-group mt-1"
                   role="group"
                   aria-label="column"
                   onClick={this.props.columnClickHandler}
              >
                <button
                  className='btn btn-secondary'
                  data-column-remove={true}
                  type="button">
                  -
                </button>
                <button
                  className='btn btn-secondary'
                  data-column-add={true}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardBuilder;
