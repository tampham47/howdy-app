/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ChannelHeader extends Component {

  getActiveState(tab) {
    var currentState = this.props.location.query.tab;

    if (!currentState && (tab === 'lesson')) {
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
          <Link to="/">
            <i className={"fa " + (this.props.icon || 'fa-home')}></i>
          </Link>
          {this.props.title || 'goingsunny'}
        </h1>
        <div className="header-bar__control-wrapper">
          {/*<Link to={{ pathname: this.props.location.pathname, query: {} }}
            className={this.getActiveState('lesson')}>
            <i className="fa fa-bookmark-o"></i>
          </Link>*/}
          {/*<Link to={{ pathname: this.props.location.pathname, query: { tab: 'message' } }}
            className={this.getActiveState('message')}>
            <i className="fa fa-paper-plane-o"></i>
          </Link>*/}
          <div className="header-bar__icon">
            <img src="https://graph.facebook.com/v2.6/1283617604996384/picture?type=large" alt=""/>
          </div>
          <div className="header-bar__icon">
            <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s50x50/15966023_364430673937982_6412280787230988244_n.jpg?oh=f01f12d6c7a25958e66fc1fe5789fd64&oe=58DD06C8" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

ChannelHeader.propTypes = {};
export default connect()(ChannelHeader);
