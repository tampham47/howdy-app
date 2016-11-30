/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MessageItem from 'components/MessageItem';
import moment from 'moment';


class Lesson extends Component {
  render() {
    return (
      <div className={"message-list " + (this.props.isShow ? '' : 'u-hide')}>
        {this.props.datacontext.map(function(item, index) {
          item.authUser = item.authUser || {};
          return (
            <div className="message-item" key={index}>
              <div className="message-item__icon">
                <img src={item.authUser.avatar} alt=""/>
              </div>
              <div className="message-item__wrapper">
                <div className="message-item__title">
                  <span className="message-item__title__name">{item.authUser.displayName}</span>
                  <small className="message-item__title__username">{`@${item.authUser.displayName}`}</small>
                  <small className="message-item__title__time">{moment(item.createdAt || null).format('MMM DD, HH:mm')}</small>
                </div>
                <MessageItem datacontext={item} />
              </div>
            </div>
          );
        }.bind(this))}
      </div>
    )
  }
}

Lesson.propTypes = {};
export default connect()(Lesson);
