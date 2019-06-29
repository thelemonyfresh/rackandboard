import React from "react";
import BoardBuilder from './BoardBuilder';
import RackBuilder from './RackBuilder';

import PropTypes from "prop-types";

class ProblemCreator extends React.Component {

  // TODO:
  // - render correct cell size for size of BoardLayout
  // - make tilebuilder that allows tile input
  // - add ability to remove tile from board, rack

  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-10 col-sm-11 col-xs-12'>
            <div className='card' ref='problemContainer'>
              <div className='card-body'>
                <BoardBuilder/>
              </div>
              <div className='card-footer'>
                <RackBuilder/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemCreator;
