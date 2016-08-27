/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

class LeftMenu extends Component {
  render() {
    return (
      <nav className="left-menu">
        <ul className="left-menu-room-list">
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <h3 className="left-menu-room-item-name">Goingsunny</h3>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <h3 className="left-menu-room-item-name">English Town</h3>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <h3 className="left-menu-room-item-name">Tiếng anh thật dễ</h3>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='login' className="left-menu-room-item-name">Login</Link>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='explore' className="left-menu-room-item-name">Explore</Link>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/' className="left-menu-room-item-name">Main</Link>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/chanel' className="left-menu-room-item-name">Goto Chanel</Link>
          </li>
        </ul>

        <button className="left-menu__new-room-btn button-primary">Add a chanel</button>
      </nav>
    )
  }
}

LeftMenu.propTypes = {};
export default LeftMenu;
