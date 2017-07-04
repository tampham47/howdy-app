/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HeaderBar extends Component {
  render() {
    return (
      <div className="header-bar">
        <h1 className="header-bar__title">
          <span className="header-bar__icon"></span>
          {this.props.title || 'Goingsunny'}
        </h1>

        {/*<div className="header-bar__control-wrapper">
          <a href=""><i className="fa fa-paper-plane-o"></i></a>
          <a href=""><i className="fa fa-bookmark-o"></i></a>
          <a href=""><i className="fa fa-bars"></i></a>
        </div>*/}
      </div>
    )
  }
}

HeaderBar.propTypes = {};
export default HeaderBar;
