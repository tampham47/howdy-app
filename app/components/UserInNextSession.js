/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Comp extends Component {
  render() {
    return (
      <div className="user-next-session">
        <h6 className="user-next-session__title">Khóa học kế tiếp</h6>
        <ul className="people-list">
          <li className="people-item">
            <span>Tam Pham</span>
            <div className="people-item__img-wrapper">
              <img src="http://orig11.deviantart.net/6719/f/2011/012/c/9/facebook_avatar_by_fyuvix-d372asb.jpg" />
            </div>
          </li>
          <li className="people-item">
            <span>Tam Pham 2</span>
            <div className="people-item__img-wrapper">
              <img src="http://culturahipster.com/wp-content/uploads/bitstrips-facebook-cultura-hipster-avatar.jpg" />
            </div>
          </li>
          <li className="people-item">
            <span>Tam Pham 3</span>
            <div className="people-item__img-wrapper">
              <img src="http://data.kenhsinhvien.net/files/2014/02/22/avatar-ep-kinh-9.jpg" />
            </div>
          </li>
        </ul>
        <small className="user-next-session__helper">Đã có 3 người tham gia !</small>
      </div>
    )
  }
}

Comp.propTypes = {};
export default connect()(Comp);
