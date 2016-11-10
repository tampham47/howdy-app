/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';
import { updateLastAccessed } from 'actions/application';


class App extends Component {

  updateOnlineStatus(user) {
    this.props.dispatch(updateLastAccessed(user));
  }

  componentDidMount() {
    client.on('connect', function() {
      client.subscribe('goingsunny');
    }.bind(this));

    client.on('message', function (topic, message) {
      var messageData = JSON.parse(message.toString());
      this.props.dispatch({
        type: ActionType.NEW_MESSAGE,
        response: messageData
      });
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
  return state;
}

export default connect(mapStateToProps)(App);
