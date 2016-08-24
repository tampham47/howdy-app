/**
 * Goingsunny 2016
 * Tw
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import client from 'libs/mqtt';

class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: [
        // {content: 'Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.'},
        // {content: 'Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.'},
        // {content: 'Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.'},
        // {content: 'Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.'},
        // {content: 'Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.'},
      ],
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
        <nav className="left-menu">
          <ul className="left-menu-room-list">
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">Goingsunny</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">English Town</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">Tiếng anh thật dễ</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <Link to={'login'} className="left-menu-room-item-name">Login</Link>
            </li>
          </ul>

          <button className="left-menu__new-room-btn button-primary">Add a chanel</button>
        </nav>

        <main className="main-area">
          <div className="header-bar">
            <h1 className="header-bar__title">
              <span className="header-bar__icon"></span>
              goingsunny
            </h1>
            <div className="header-bar__control-wrapper">
              <a href=""><i className="fa fa-star-o"></i></a>
              <a href=""><i className="fa fa-cog"></i></a>
              <a href=""><i className="fa fa-send-o"></i></a>
              <a href=""><i className="fa fa-toggle-left"></i></a>
            </div>
          </div>

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
