/**
 * Goingsunny 2016
 * Tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import * as ActionType from 'actions/chanels';
import client from 'middleware/mqtt';

class MessagePanel extends Component {

  // static fetchData({ store, params }) {
  //   return store.dispatch(loadProfile());
  // }

  constructor(props) {
    console.log('props', props);
    super(props);

    this.state = {
      inputMessage: '',
      authUser: props.authUser,
      currentUser: props.currentUser,
    };
  }

  componentDidMount() {
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
    var propsData = JSON.parse(JSON.stringify(this.props));
    console.log('propsData', propsData);

    var chanelData = this.props.chanels.toJS();
    var currentChanel = chanelData.currentChanel;
    var messageList = chanelData.messagesInChanel[currentChanel];

    return (
      <div className="relm">
        <LeftMenu/>

        <main className="main-area">
          <HeaderBar/>

          <div className="main-content">
            <div id='content-scroller' className="main-content__scroller">
              <div className="message-list">
                {messageList.map(function(item, index) {
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
                <div className="input-area__icon">
                  {<img src={propsData.currentUser.avatar} alt=""/>}
                </div>
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
    authUser: state.authUser,
    currentUser: state.currentUser,
    chanels: state.chanels,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

MessagePanel.propTypes = {
  authUser: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  chanels: PropTypes.object.isRequired,
}

export { MessagePanel };
export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel);
