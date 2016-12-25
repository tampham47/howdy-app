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
        <h6 className="user-next-session__title">Ca học kế tiếp</h6>
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
          <small className="user-next-session__helper">Đã có {userList.length} người tham gia!</small>
        }

        { (userList.length == 0) &&
          <small className="user-next-session__helper">Chưa có ai, hãy là người đầu tiên tham gia!</small>
        }
      </div>
    )
  }
}

Comp.propTypes = {};
export default connect()(Comp);
