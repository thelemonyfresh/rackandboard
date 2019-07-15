import React from "react";

class BoardSizeControls extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h4>Board Size:
          <span className="badge badge-pill badge-secondary ml-1">
            {this.props.numCols} x {this.props.numRows}
          </span>
        </h4>

        <div>
          Columns:
          <div className="btn-group ml-1"
               role="group"
               aria-label="column"
               onClick={this.props.columnHandler}
          >
            <button
              className='btn btn-sm btn-secondary'
              data-column-remove={true}
              type="button">
              -
            </button>
            <button
              className='btn btn-sm btn-secondary'
              data-column-add={true}
              type="button"
            >
              +
            </button>
          </div>
        </div>
        <div>
          Rows:
          <div className="btn-group-vertical ml-1"
               role="group"
               aria-label="row"
               onClick={this.props.rowHandler}
          >
            <button
              className='btn btn-sm btn-secondary'
              data-row-remove={true}
              type="button"
            >
              -
            </button>
            <button
              className='btn btn-sm btn-secondary'
              data-row-add={true}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardSizeControls;
