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

  // static fetchData({ store, params }) {
  //   return store.dispatch(loadProfile());
  // }

  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
      inputMessage: '',
      authUser: props.authUser
    };
  }

  componentDidMount() {
    // console.log('componentDidMount', this.props.authUser.get('name'));
    console.log('componentDidMount', this.props.authUser.get('displayName'));
    console.log('componentDidMount', this.props.authUser.get('avatar'));

    client.on('connect', function () {
      var data = JSON.stringify({
        content: 'Welcome to goingsunny',
        authUser: {
          displayName: 'Gsbot'
        }
      })
      client.subscribe('goingsunny');
      client.publish('goingsunny', data);
    });

    client.on('message', function (topic, message) {

      var messageData = JSON.parse(message.toString());
      console.log('message', messageData);

      var messageList = this.state.messageList;
      messageList.push(messageData);

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

      if (this.state.inputMessage.trim() === '')  {
        return;
      }

      var data = JSON.stringify({
        content: this.state.inputMessage,
        authUser: this.state.authUser
      });
      client.publish('goingsunny', data);

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
    authUser: state.authUser
  };
}

MessagePanel.propTypes = {
  authUser: PropTypes.object.isRequired
}

export { MessagePanel };
export default connect(mapStateToProps, { loadProfile })(MessagePanel);
