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
import ChannelHeader from 'components/ChannelHeader';
import PeopleInChannel from 'components/PeopleInChannel';
import AddChannel from 'components/AddChannel';
import NotificationPanel from 'components/NotificationPanel';
import Lesson from 'components/Lesson';
import MessageList from 'components/MessageList';
import ChannelSetting from 'components/ChannelSetting';

import { changeChanel, loadChannels, loadMessageAndChannel, fetchChannelData } from 'actions/chanels';
import { updateNotificationPanelState } from 'actions/application';
import { showAppearin, changeMode } from 'actions/appearin';
import * as ChannelType from 'actions/chanels';
import * as AppearinType from 'actions/appearin';
import listener from 'middleware/listener';
import AppearinSDK from 'appearin-sdk';
import utils from 'middleware/utils';
import CountDownComp from 'components/CountDown';


var appearin = new AppearinSDK();

class LayoutDefault extends Component {

  static fetchData({ store, params }) {
    var channelUrl = params.channelUrl || 'goingsunny';
    var currentUser = store.getState().currentUser;
    var userId = currentUser.id || currentUser._id;
    return store.dispatch(fetchChannelData({
      channelUrl,
      userId,
      sessionName: utils.getSessionNameByDate(),
      prevSessionName: utils.getPrevSessionName()
    }));
  }

  static getDefaultStore({ store, params }) {
    var channelUrl = params.channelUrl || 'goingsunny';
    store.dispatch(changeChanel({ channelUrl }));
  }

  constructor(props) {
    super(props);

    this.state = {
      inputMessage: '',
      currentUser: props.currentUser,
      unreadNotiList: []
    };
  }

  componentDidMount() {
    var channelUrl = this.props.params.channelUrl || 'goingsunny';
    var userId = this.props.currentUser._id || this.props.currentUser.id;
    this.props.fetchChannelData({
      channelUrl,
      userId,
      sessionName: utils.getSessionNameByDate(),
      prevSessionName: utils.getPrevSessionName()
    });

    // check more data later
    var unreadNotiList = this.getUnreadNotifications(this.props.notifications, this.props.userNotifications);
    console.log('unreadNotiList', unreadNotiList);
    console.log('unreadNotiList 2', this.props.notifications, this.props.userNotifications);
    if (unreadNotiList.length > 0) {
      console.log('unreadNotiList', unreadNotiList);
      this.props.updateNotificationPanelState(true);
      this.setState({ unreadNotiList });
    }

    // scroll to newest message
    var scroller = document.getElementById('content-scroller');
    // using listent only for animation task
    listener.sub(ChannelType.LOADED_MESSAGES.toString(), function() {
      if (!scroller) return;
    });
    listener.sub(ChannelType.NEW_MESSAGE.toString(), function() {
      if (!scroller) return;
      scroller.scrollTop = scroller.scrollHeight;
    });
    listener.sub(ChannelType.CHANEL_CHANGED.toString(), function() {
      this.props.showAppearin(false);
      var iframe = document.getElementById('js-appearin-iframe-holder');
      iframe.src = 'about:blank';
    }.bind(this));
    listener.sub(ChannelType.OPENED_APPEARIN_ROOM.toString(), function(event) {
      this.props.showAppearin(true);
      var iframe = document.getElementById('js-appearin-iframe-holder');
      appearin.addRoomToIframe(iframe, event.detail.content);
    }.bind(this));
  }

  componentWillUnmount() {
    listener.unsub(ChannelType.LOADED_MESSAGES.toString());
    listener.unsub(ChannelType.NEW_MESSAGE.toString());
    listener.unsub(ChannelType.CHANEL_CHANGED.toString());
    listener.unsub(ChannelType.OPENED_APPEARIN_ROOM.toString());
  }

  componentWillReceiveProps(props) {
    var unreadNotiList = this.getUnreadNotifications(props.notifications, props.userNotifications);
    console.log('componentWillReceiveProps', unreadNotiList, props.notifications, props.userNotifications);
    if (unreadNotiList.length > 0 && !this.props.appState.notificationPanelState) {
      this.props.updateNotificationPanelState(true);
      this.setState({ unreadNotiList });
    }
  }

  getMessageData() {
    var channelUrl = this.props.params.channelUrl || 'goingsunny';
    var data = {
      isManual: true,
      authUser: this.state.currentUser,
      channelUrl: channelUrl,
      createdAt: new Date(),
      _user: this.state.currentUser._id,
      _channel: null
    };

    return data;
  }

  sendMessage(content, type) {
    var d = this.getMessageData();
    d.content = content;
    d.type = type;
    client.publish('goingsunny', JSON.stringify(d));
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.stopPropagation();
      e.preventDefault();

      if (this.state.inputMessage.trim() === '')  {
        return;
      }

      this.sendMessage(this.state.inputMessage);
      this.setState({ inputMessage: '' });
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

  handleAddVideoRoom(isAppearin) {
    this.props.showAppearin(isAppearin);
    var iframe = document.getElementById('js-appearin-iframe-holder');

    if (isAppearin) {
      var roomName = this.props.params.channelUrl;
      appearin.addRoomToIframe(iframe, roomName);
    } else {
      // remove appearin out of iframe
      iframe.src = 'about:blank';
    }
  }

  applyRoom(roomName) {
    var iframe = document.getElementById('js-appearin-iframe-holder');
    appearin.addRoomToIframe(iframe, roomName);
    this.props.showAppearin(true);
  }

  handleChangeMode(mode) {
    this.props.changeMode(mode);
  }

  getUnreadNotifications(notiList, userNotiList) {
    var r = [];

    for (var i = 0; i < notiList.length; i++) {
      var b = false;

      for (var j = 0; j < userNotiList.length; j++) {
        if ((notiList[i].id === userNotiList[j].notification)) {
          b = true;
          break;
        }
      }

      if (!b) {
        r.push(notiList[i]);
      }
    }

    return r;
  }

  render() {
    // var channelUrl = this.props.params.channelUrl || 'goingsunny';
    var channelUrl = 'goingsunny';
    var propsData = JSON.parse(JSON.stringify(this.props));

    var chanelData = this.props.chanels;
    var currentChanel = chanelData.currentChanel;

    var channelDetail = _.find(chanelData.chanelList, function(i) {
      return (i.url === channelUrl);
    }) || {};

    var messageList = this.filterMessageByChannel(this.props.messages.toJS(), channelUrl);
    var appearinMode = 'appearin-iframe--' + this.props.appearin.get('mode');
    var isAppearinActive = this.props.appearin.get('isAppearin') ? '_active' : '';
    var users = this.props.users.toJS();
    var mainContent;
    var mainContentClass = 'main-content--lesson';
    var isShowLesson = false;
    var isShowMessage = false;

    switch (this.props.location.query.tab) {
      case 'lesson':
        isShowLesson = true;
        mainContentClass = 'main-content--lesson';
        break;
      case 'message':
        isShowMessage = true;
        mainContentClass = '';
        break;
      case 'setting':
        break
      default:
        isShowLesson = true;
    }

    return (
      <div className="relm">
        <NotificationPanel
          isActive={this.props.appState.notificationPanelState}
          unreadNotiList={this.state.unreadNotiList} />

        <main className="main-area">
          <div className="room-panel">
            <div className="room-panel__wrapper">
              <CountDownComp
                currentUser={this.props.currentUser}
                prevSession={this.props.appState.prevSession || {}}
                currentSessionList={this.props.currentSessionList}
                userInNextSession={this.props.userInNextSession} />
            </div>
          </div>

          {/*this.props.children*/}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState.toJS(),
    currentUser: state.currentUser.toJS(),
    chanels: state.chanels.toJS(),
    channelData: state.chanels.toJS(),
    messages: state.messages,
    appearin: state.appearin,
    users: state.users,
    notifications: state.notifications.toJS(),
    userNotifications: state.userNotifications.toJS(),
    currentSessionList: state.appState.toJS().currentSessionList,
    userInNextSession: state.appState.toJS().userInNextSession,
  };
}

var mapDispatchToProps = {
  changeChanel,
  loadChannels,
  loadMessageAndChannel,
  showAppearin,
  changeMode,
  fetchChannelData,
  updateNotificationPanelState
}

LayoutDefault.propTypes = {
  currentUser: PropTypes.object.isRequired,
  chanels: PropTypes.object.isRequired,
}

LayoutDefault.defaultProps = {};

LayoutDefault.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export { LayoutDefault };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutDefault);
