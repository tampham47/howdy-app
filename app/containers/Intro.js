/**
 * Goingsunny 2016
 * Tw
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import client from 'middleware/mqtt';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';

class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      inputMessage: ''
    };
  }

  componentDidMount() {
    client.on('connect', function () {
      client.subscribe('goingsunny');
      client.publish('goingsunny', 'Hello mqtt');
    });

    client.on('message', function (topic, message) {
      console.log('mqtt: ' + topic);
      console.log('mqtt: ' + message.toString());

      var messageList = this.state.messageList;
      messageList.push({
        content: message.toString()
      });

      this.setState({
        messageList: messageList
      });

      // scroll to newest message
      var scroller = document.getElementById('content-scroller');
      scroller.scrollTop = scroller.scrollHeight;
    }.bind(this));
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.stopPropagation();
      e.preventDefault();

      client.publish('goingsunny', this.state.inputMessage);
      this.setState({
        inputMessage: ''
      });
    }
  }

  handleChange(e) {
    this.setState({
      inputMessage: e.target.value
    });
  }

  render() {
    return (
      <div className="relm">
        <LeftMenu/>

        <main className="main-area">
          <HeaderBar/>

          <div className="main-content">
            <div id='content-scroller' className="main-content__scroller">
              <div className="message-list">
                {this.state.messageList.map(function(item, index) {
                  return (
                    <div className="message-item" key={index}>
                      <div className="message-item__icon"></div>
                      <div className="message-item__wrapper">
                        <div className="message-item__title">
                          <span className="message-item__title__name">Gerasimos Maropoulos</span>
                          <small className="message-item__title__username">@kataras</small>
                          <small className="message-item__title__time">Jul 03 19:46</small>
                        </div>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="input-area">
              <div className="input-area__wrapper">
                <div className="input-area__icon"></div>
                <div className="input-area__content-wrapper">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Click here to type chat message"
                    value={this.state.inputMessage}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onChange={this.handleChange.bind(this)}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="room-panel">
            <div className="room-panel__wrapper">
              <h6>People</h6>

              <ul className="people-list">
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Intro);
