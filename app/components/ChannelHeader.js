/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ChannelHeader extends Component {

  getActiveState(tab) {
    var currentState = this.props.location.query.tab;
    console.log('getActiveState', currentState);
    if (!currentState && (tab === 'message')) {
      return '_active';
    }
    if (currentState === tab) {
      return '_active';
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="header-bar">
        <h1 className="header-bar__title">
          <span className="header-bar__icon"></span>
          {this.props.title || 'Goingsunny'}
        </h1>
        <div className="header-bar__control-wrapper">
          <Link to={{ pathname: this.props.location.pathname, query: { tab: 'message' } }}
            className={this.getActiveState('message')}>
            <i className="fa fa-paper-plane-o"></i>
          </Link>
          <Link to={{ pathname: this.props.location.pathname, query: { tab: 'lesson' } }}
            className={this.getActiveState('lesson')}>
            <i className="fa fa-bookmark-o"></i>
          </Link>
          <Link to={{ pathname: this.props.location.pathname, query: { tab: 'setting' } }}
            className={this.getActiveState('setting')}>
            <i className="fa fa-bars"></i>
          </Link>
        </div>
      </div>
    )
  }
}

ChannelHeader.propTypes = {};
export default connect()(ChannelHeader);
