/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp } from 'actions/chanels';

class AddRoom extends Component {
  render() {
    var isActive = this.props.isActive ? '_active' : '';

    return (
      <div className={`comp-add-room ${isActive}`}>
        <div className="comp-add-room__wrapper">
          <div className="container">
            <div className="columns six offset-by-three">
              <div className="comp-add-room__content">
                <p>Add room</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddRoom.propTypes = {};
export default connect(null, { showAddChannelComp })(AddRoom);
