/**
 * Goingsunny 2016
 * Tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import client from 'middleware/mqtt';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadProfile } from 'actions/message-panel';

class MessagePanel extends Component {

  static fetchData({ store, params }) {
    return store.dispatch(loadProfile());
  }

  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      inputMessage: ''
    };
  }

  componentDidMount() {
    this.props.loadProfile();
    console.log('componentDidMount', this.props.user.get('name'));

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
                      <div className="message-item__icon">
                        <img src={this.props.user.get('avatar')} alt=""/>
                      </div>
                      <div className="message-item__wrapper">
                        <div className="message-item__title">
                          <span className="message-item__title__name">{this.props.user.get('fullName')}</span>
                          <small className="message-item__title__username">{`@${this.props.user.get('username')}`}</small>
                          <small className="message-item__title__time">Jul 03 19:46</small>
                        </div>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                }.bind(this))}
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

function mapStateToProps(state) {
  return {
    user: state.messagePanel
  };
}

MessagePanel.propTypes = {
  user: PropTypes.object.isRequired
}

export { MessagePanel };
export default connect(mapStateToProps, { loadProfile })(MessagePanel);
