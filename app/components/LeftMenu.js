/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { List } from 'immutable';
import { changeChanel } from 'actions/chanels';

class LeftMenu extends Component {

  handleChanelChange(chanel) {
    this.props.changeChanel({ chanel });
    this.props.router.push(`/chanel/${chanel}`);
  }

  render() {
    return (
      <nav className="left-menu">
        <ul className="left-menu-room-list">
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <a href="javascript:;" onClick={this.handleChanelChange.bind(this, "goingsunny")}
              className="left-menu-room-item-name">Goingsunny</a>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <a href="javascript:;" onClick={this.handleChanelChange.bind(this, "englishtown")}
              className="left-menu-room-item-name">English Town</a>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <a href="javascript:;" onClick={this.handleChanelChange.bind(this, "englisheasy")}
              className="left-menu-room-item-name">Tiếng anh thật dễ</a>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/explore' className="left-menu-room-item-name">Explore</Link>
          </li>
          {/*<li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/' className="left-menu-room-item-name">Main</Link>
          </li>*/}
        </ul>

        <button className="left-menu__new-room-btn button-primary">Add a chanel</button>
      </nav>
    )
  }
}

LeftMenu.propTypes = {};
export default connect(null, { changeChanel })(withRouter(LeftMenu));
