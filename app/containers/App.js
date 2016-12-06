/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';
import { updateLastAccessed, getBrokerMessage } from 'actions/application';


class App extends Component {

  updateOnlineStatus(user) {
    this.props.dispatch(updateLastAccessed(user));
  }

  componentDidMount() {
    console.log('App.currentUser', this.props.currentUser && this.props.currentUser.toJS());
    var currentUser = this.props.currentUser ? this.props.currentUser.toJS() : null;

    client.on('connect', function() {
      client.subscribe('goingsunny');
      client.subscribe('goingsunny_system_meeting');

      // subscribe for specific data of each user
      if (currentUser) {
        client.subscribe(`SYSTEM_${currentUser._id}`);
      }
    }.bind(this));

    client.on('message', function (topic, message) {
      var messageData = {};
      try { messageData = JSON.parse(message.toString()); }
      catch (err) {}

      switch (topic) {
        case 'goingsunny':
          this.props.dispatch({
            type: ActionType.NEW_MESSAGE,
            response: messageData
          });
          break;
        case 'goingsunny_system_meeting':
          console.log('goingsunny_system_meeting', messageData);
          break;
        default:
          console.log('App.componentDidMount', topic);
          this.props.dispatch(getBrokerMessage(messageData));
      }
    }.bind(this));

    // update online status every 90sec
    var currentUser = this.props.currentUser.toJS();
    if (currentUser.id || currentUser._id) {
      this.updateOnlineStatus(currentUser);
      setInterval(function() {
        this.updateOnlineStatus(currentUser);
      }.bind(this), 90000);
    }
  }

  render() {
    console.log('App.render', this.props.location.pathname);
    var location = this.props.location.pathname;
    if (typeof window !== 'undefined') {
      if (location == '/login') {
        document.getElementsByTagName('body')[0].classList.add('login-page');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('login-page');
      }
    }

    return (
      <div className="relm">
        {/*<div className="feedback-link">
          <Link to="/feedback">Feedback</Link>
        </div>
        <div className="feedback-link feedback-link--how-it-works">
          <Link to="/blog/how-it-works">How it works?</Link>
        </div>*/}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
