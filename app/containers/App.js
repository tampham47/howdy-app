/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';

class App extends Component {

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
  }

  render() {
    return (
      <div className="relm">
        <div className="feedback-link">
          <Link to="/feedback">Feedback</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
