/**
 * Goingsunny 2016
 * Tw
 */

import _ from 'lodash';
import client from 'middleware/mqtt';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';

import * as ActionType from 'actions/chanels';
import { changeChanel, loadChannels, loadMessageByChannel } from 'actions/chanels';
import { showAppearin, changeMode } from 'actions/appearin';
import * as AppearinType from 'actions/appearin';

class Chanel extends Component {

  static fetchData({ store, params }) {
    var channelUrl = params.chanelUrl || 'goingsunny';
    store.dispatch(loadMessageByChannel(channelUrl));
  }

  constructor(props) {
    super(props);
    this.state = {
      inputMessage: '',
      currentUser: props.currentUser,
    };
  }

  componentDidMount() {
    console.log('Channel.componentDidMount');
    var channelUrl = this.props.params.chanelUrl || 'goingsunny';
    this.props.loadMessageByChannel(channelUrl);
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.stopPropagation();
      e.preventDefault();

      if (this.state.inputMessage.trim() === '')  {
        return;
      }

      var data = JSON.stringify({
        isManual: true,
        chanelId: this.props.chanels.get('currentChanel'),
        content: this.state.inputMessage,
        authUser: this.state.currentUser,
        channelUrl: this.props.chanels.get('currentChanel')
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

  filterMessageByChannel(arr, channelUrl) {
    return _.filter(arr, { channelUrl: channelUrl });
  }

  handleAddVideoRoom() {
    console.log('Channel.handleAddVideoRoom');
    this.props.showAppearin(true);
  }

  handleChangeMode(mode) {
    this.props.changeMode(mode);
  }

  render() {
    var channelUrl = this.props.params.channelUrl || 'goingsunny';
    var propsData = JSON.parse(JSON.stringify(this.props));

    var chanelData = propsData.chanels;
    var currentChanel = chanelData.currentChanel;
    var messageList = this.filterMessageByChannel(this.props.messages.toJS(), channelUrl);
    var appearinMode = 'appearin-iframe--' + this.props.appearin.get('mode');

    console.log('propsData', propsData);
    console.log('messages', this.props.messages.toJS());
    console.log('appearinMode', appearinMode);

    return (
      <div className="relm">
        <LeftMenu chanelList={chanelData.chanelList} />

        <main className="main-area">
          <HeaderBar title={currentChanel} />

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

              <div className="room-panel__users">
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

            <div className={"appearin-iframe _active " + appearinMode}>
              <div className="appearin-iframe__control-wrapper">
                <button onClick={this.handleChangeMode.bind(this, 'min')}
                  className="appearin-iframe__control-wrapper__close">
                  <i className="fa fa-close" aria-hidden="true"></i>
                </button>
                <button onClick={this.handleChangeMode.bind(this, 'min')}
                  className="button-primary appearin-iframe__control-wrapper__min">
                  <i className="fa fa-compress" aria-hidden="true"></i>
                </button>
                <button onClick={this.handleChangeMode.bind(this, 'full')}
                  className="button-primary appearin-iframe__control-wrapper__full">
                  <i className="fa fa-expand" aria-hidden="true"></i>
                </button>
                <button onClick={this.handleChangeMode.bind(this, 'left')}
                  className="button-primary appearin-iframe__control-wrapper__left">
                  <i className="fa fa-caret-square-o-right" aria-hidden="true"></i>
                </button>
              </div>
              <div className="appearin-iframe__wrapper">
                <iframe src="https://appear.in/tampham47" width="100%" height="100%" frameBorder="0"></iframe>
              </div>
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
    chanelList: state.chanels.chanelList,
    messages: state.messages,
    appearin: state.appearin,
  };
}

var mapDispatchToProps = {
  changeChanel,
  loadChannels,
  loadMessageByChannel,
  showAppearin,
  changeMode
}

Chanel.propTypes = {
  authUser: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  chanels: PropTypes.object.isRequired,
}

Chanel.defaultProps = {};

export { Chanel };
export default connect(mapStateToProps, mapDispatchToProps)(Chanel);
