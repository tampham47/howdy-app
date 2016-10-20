/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';

class App extends Component {

  componentDidMount() {

    if (window.location.protocol === 'http://') {
      client.on('connect', function() {
        client.subscribe('goingsunny');
      }.bind(this));
    }

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
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
