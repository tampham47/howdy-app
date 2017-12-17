/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';
import { updateLastAccessed, getBrokerMessage, userJoinNextSession } from 'actions/application';
import { Helmet } from 'react-helmet';


class App extends Component {

  updateOnlineStatus(user) {
    this.props.dispatch(updateLastAccessed(user));
  }

  componentDidMount() {
    var currentUser = this.props.currentUser ? this.props.currentUser.toJS() : null;

    client.on('connect', function() {
      client.subscribe('goingsunny');
      client.subscribe('goingsunny_system_meeting');
      client.subscribe('SYSTEM_CLASS_DATA');

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
        case 'SYSTEM_CLASS_DATA':
          this.props.dispatch(userJoinNextSession(messageData.user));
          break;
        case 'goingsunny_system_meeting':
          break;
        default:
          // on SYSTEM_userId topic
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
    var location = this.props.location.pathname;
    if (typeof window !== 'undefined') {
      if (location == '/login' || location == '/guide') {
        document.getElementsByTagName('body')[0].classList.add('login-page');
      } else {
        document.getElementsByTagName('body')[0].classList.remove('login-page');
      }
    }

    return (
      <div className="relm">
        <Helmet>
          <title>Goingsunny - Online learning english system</title>
          <meta name="description" content="Let's speak english!"/>
          <meta name="keywords" content="Learning, English, Chatting, Video calling, Network"/>
          <meta name="author" content="Tam Pham"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/*for Google*/}
          <meta name="copyright" content="goingsunny.com" />
          <meta name="application-name" content="goingsunny" />

          {/*for Facebook*/}
          <meta property="og:title" content="Goingsunny.com" />
          <meta property="og:type" content="article" />
          <meta property="og:image" content="https://goingsunny.com/android-chrome-512x512.png" />
          <meta property="og:url" content="goingsunny.com" />
          <meta property="og:description" content="Let's speak english!" />

          {/*for Twitter*/}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Goingsunny.com" />
          <meta name="twitter:description" content="Let's speak english!" />
          <meta name="twitter:image" content="https://goingsunny.com/android-chrome-512x512.png" />
        </Helmet>

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
