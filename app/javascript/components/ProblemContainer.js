import React from "react";
import PropTypes from "prop-types";
class ProblemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.measure = this.measure.bind(this);
  }

  state = {
    boardWidth: 800,
    boardHeight: 800
  };

  //
  // Helpers
  //

  measure () {
    let rect = this.refs.boardArea.getBoundingClientRect();
    if(this.state.width !== rect.width || this.state.height !== rect.height){
      this.setState({
        boardWidth: rect.width,
        boardHeight: rect.height
      });
    }
  }

  //
  // Lifecycle
  //

  componentWillMount () {
    window.addEventListener('resize', this.measure, false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.measure, false);
  }

  componentDidMount (){
    this.measure();
  }

  //
  // Render
  //
  render () {
    return (
      <div className='row h-100'>
        <div className="col-3 p-0">
          {this.props.sidebar}
        </div>
        <div className='col-9 p-0'>
          <div className="card h-100">
            <div className="card-body text-center" ref='boardArea'>
              {this.props.board}
            </div>
            <div className="card-footer text-center">
              {this.props.rack}
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default ProblemContainer;
