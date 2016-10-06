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

var appearin = new AppearinSDK();

class Chanel extends Component {

  static fetchData({ store, params }) {
    var channelUrl = params.channelUrl || 'goingsunny';
    var userId = store.getState().currentUser.id;
    return store.dispatch(fetchChannelData({ channelUrl, userId }));
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
    this.props.fetchChannelData({ channelUrl, userId });

    // check more data later
    var unreadNotiList = this.getUnreadNotifications(this.props.notifications, this.props.userNotifications);
    console.log('Channel.notifications', this.props.notifications);
    console.log('Channel.userNotifications', this.props.userNotifications);
    console.log('Channel.unreadNotiList', unreadNotiList);
    if (unreadNotiList.length > 0) {
      this.props.updateNotificationPanelState(true);
      this.setState({ unreadNotiList });
    }

    // scroll to newest message
    var scroller = document.getElementById('content-scroller');
    // using listent only for animation task
    listener.sub(ChannelType.LOADED_MESSAGES.toString(), function() {
      if (!scroller) return;
      scroller.scrollTop = scroller.scrollHeight;
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
    console.log('Chanel.componentWillReceiveProps', props);
    // console.log('Channel.componentDidMount', unreadNotiList, this.props.userNotifications);

    var unreadNotiList = this.getUnreadNotifications(props.notifications, props.userNotifications);
    console.log('Channel.notifications', props.notifications);
    console.log('Channel.userNotifications', props.userNotifications);
    console.log('Channel.unreadNotiList', unreadNotiList);
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
    console.log('Channel.handleAddVideoRoom');
    this.props.showAppearin(isAppearin);
    var iframe = document.getElementById('js-appearin-iframe-holder');

    if (isAppearin) {
      appearin.getRandomRoomName(function (err, roomName) {
        if (err) {
          alert(err.toString());
        } else {
          appearin.addRoomToIframe(iframe, roomName);
          this.sendMessage(roomName, 'appearin-room');
        }
      }.bind(this));
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
        if ((notiList[i].id === userNotiList[j].notification) ||
          (notiList[i]._id === userNotiList[j]._notification)) {
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
    var channelUrl = this.props.params.channelUrl || 'goingsunny';
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

    switch (this.props.location.query.tab) {
      case 'message':
        mainContent = <MessageList datacontext={messageList} />
        break;
      case 'lesson':
        mainContent = <Lesson datacontext={this.props.channelData.currentLesson} />
        break;
      case 'setting':
        mainContent = <ChannelSetting datacontext={channelDetail} />
        break
      default:
        mainContent = <MessageList datacontext={messageList} />
    }

    return (
      <div className="relm">
        <NotificationPanel
          isActive={this.props.appState.notificationPanelState}
          unreadNotiList={this.state.unreadNotiList} />
        <AddChannel isActive={chanelData.isShowAddChannelComp} />
        <LeftMenu chanelList={chanelData.chanelList} />

        <main className="main-area">
          <div className="main-content">
            <ChannelHeader title={channelDetail.name} datacontext={channelDetail}
              location={this.props.location} />

            <div className="main-content__wrapper">
              <div id='content-scroller' className="main-content__scroller">
                { mainContent }
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
            <PeopleInChannel datacontext={users} />

            <div className={`appearin-iframe ${appearinMode} ${isAppearinActive}`}>
              <div className="appearin-iframe__control-wrapper">
                <button onClick={this.handleAddVideoRoom.bind(this, false)}
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
                <div className="appearin-iframe__create-room">
                  <a href="javascript:;" className="button button--add-room"
                    onClick={this.handleAddVideoRoom.bind(this, true)}>
                    <span className="button--add-room__m-wrapper">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      add video chat room
                    </span>
                  </a>
                </div>
                <div className="appearin-iframe__content">
                  <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    src="" id="js-appearin-iframe-holder"
                    width="100%" height="100%" frameBorder="0"></iframe>
                </div>
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
    appState: state.appState.toJS(),
    currentUser: state.currentUser.toJS(),
    chanels: state.chanels.toJS(),
    channelData: state.chanels.toJS(),
    messages: state.messages,
    appearin: state.appearin,
    users: state.users,
    notifications: state.notifications.toJS(),
    userNotifications: state.userNotifications.toJS()
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

Chanel.propTypes = {
  currentUser: PropTypes.object.isRequired,
  chanels: PropTypes.object.isRequired,
}

Chanel.defaultProps = {};

Chanel.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export { Chanel };
export default connect(mapStateToProps, mapDispatchToProps)(Chanel);
