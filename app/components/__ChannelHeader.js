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
    console.log('this.props.userInSession', this.props.userInSession);

    return (
      <div className="header-bar">
        <h1 className="header-bar__title">
          <Link to="/">
            <i className={"fa " + (this.props.icon || 'fa-home')}></i>
          </Link>
          {this.props.title || 'goingsunny'}
        </h1>

        {/*<div className="header-bar__control-wrapper">
          <Link to={{ pathname: this.props.location.pathname, query: {} }}
            className={this.getActiveState('lesson')}>
            <i className="fa fa-bookmark-o"></i>
          </Link>
          <Link to={{ pathname: this.props.location.pathname, query: { tab: 'message' } }}
            className={this.getActiveState('message')}>
            <i className="fa fa-paper-plane-o"></i>
          </Link>
        </div>*/}

        { this.props.userInSession &&
          <div className="header-bar__control-wrapper">
            {this.props.userInSession.map(function(i) {
              return (
                <div className="header-bar__icon" key={i.id}>
                  <img src={i.user.avatar} alt=""/>
                </div>
              );
            })}
          </div>
        }
      </div>
    )
  }
}

ChannelHeader.propTypes = {};
export default connect()(ChannelHeader);
