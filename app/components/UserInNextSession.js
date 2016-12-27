/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Comp extends Component {
  render() {
    var userList = this.props.userInNextSession || [];

    return (
      <div className="user-next-session">
        <h6 className="user-next-session__title">Next session</h6>
        <ul className="people-list">
        {
          userList.map(function(i) {
            return (
              <li className="people-item" key={i._id}>
                <span>{i.displayName}</span>
                <div className="people-item__img-wrapper">
                  <img src={i.avatar} />
                </div>
              </li>
            )
          })
        }
        </ul>

        { (userList.length > 0) &&
          <small className="user-next-session__helper">{userList.length} person has joined!</small>
        }

        { (userList.length == 0) &&
          <small className="user-next-session__helper">Be the first person join next session!</small>
        }
      </div>
    )
  }
}

Comp.propTypes = {};
export default connect()(Comp);
