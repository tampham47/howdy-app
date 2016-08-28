/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';

class App extends Component {

  componentDidMount() {
    client.on('connect', function() {
      var data = JSON.stringify({
        chanelId: 'goingsunny',
        content: 'Welcome to goingsunny',
        authUser: {
          displayName: 'Gsbot'
        }
      });

      client.subscribe('goingsunny');
      client.publish('goingsunny', data);
    }.bind(this));

    client.on('message', function (topic, message) {
      var messageData = JSON.parse(message.toString());
      this.props.dispatch({
        type: ActionType.NEW_MESSAGE,
        response: messageData
      });

      // scroll to newest message
      var scroller = document.getElementById('content-scroller');
      if (scroller) {
        scroller.scrollTop = scroller.scrollHeight;
      }
    }.bind(this));
  }

  render() {
    // var pData = JSON.parse(JSON.stringify(this.props));
    // console.log('APP', pData);

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
