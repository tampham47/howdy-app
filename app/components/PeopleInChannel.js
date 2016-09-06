/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

class PeopleInChannel extends Component {
  render() {
    var defaultAvatar = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=f518a1d4d5a6b640944e8e6f8395e5d6&oe=584B932F';

    return (
      <div className="room-panel__wrapper">
        <div className="room-panel__users">
          <h6>People</h6>
          <ul className="people-list">
            {this.props.datacontext.map(function(item) {
              return (
                <li className="people-item">
                  {<img src={item.avatar || defaultAvatar} alt={item.displayName} />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
}

PeopleInChannel.propTypes = {};
export default PeopleInChannel;
