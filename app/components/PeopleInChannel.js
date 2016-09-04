/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

class PeopleInChannel extends Component {
  render() {
    return (
      <div className="room-panel__wrapper">
        <div className="room-panel__users">
          <h6>People</h6>
          <ul className="people-list">
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
            <li className="people-item"></li>
          </ul>
        </div>
      </div>
    )
  }
}

PeopleInChannel.propTypes = {};
export default PeopleInChannel;
