/**
 * gsun2016
 * tw
 */

import goingsunny from 'middleware/debug';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadDataForBlog } from 'actions/chanels';
import listener from 'middleware/listener';
import * as ApplicationType from 'actions/application';
import { enrollNextSession, loadCurrentSession } from 'actions/application';
import utils from 'middleware/utils';
import ReactCountdownClock from 'react-countdown-clock';
import CountDown from 'react-simple-countdown';
import moment from 'moment';


class MeetingRoom extends Component {

  static fetchData({ store, params }) {
    return store.dispatch(loadCurrentSession({
      sessionName: utils.getSessionNameByDate()
    }));
  }

  constructor(props) {
    super(props);
    this.state = {
      systemMessage: []
    };
  }

  componentDidMount() {
    goingsunny.log('MeetingRoom.componentDidMount', utils.getSessionNameByDate());
    this.props.dispatch(loadCurrentSession({
      sessionName: utils.getSessionNameByDate()
    }));

    listener.sub(ApplicationType.GOT_BROKER_MESSAGE.toString(), function(e) {
      console.log('ApplicationType.GOT_BROKER_MESSAGE', e.detail);
      alert(`You will be lead to classroom: ${e.detail.channel}`);
      this.props.router.push(`/c/${e.detail.channel}`);
      // var systemMessage = this.state.systemMessage;
      // systemMessage.push(e.detail);
      // this.setState({
      //   systemMessage: systemMessage
      // });
    }.bind(this));
  }

  componentWillUnmount() {
    listener.unsub(ApplicationType.GOT_BROKER_MESSAGE.toString());
  }

  handdleEnrollNextSession() {
    var curUser = this.props.currentUser;
    var payload = {
      _user: curUser.id || curUser._id,
      sessionName: utils.getSessionNameByDate()
    };
    this.props.dispatch(enrollNextSession(payload));
  }

  isEnrolledCurrentSession(user, sessionList) {
    goingsunny.log('isEnrolledCurrentSession', user, sessionList);
    var userId = user.id || user._id;

    for (var i=0; i<sessionList.length; i++) {
      if (sessionList[i]._user === userId || sessionList[i].user === userId) {
        return true;
      }
    }
    return false;
  }

  onCountDownComplete() {
    console.log('onCountDownComplete');
  }

  getNextSessionTime() {
    var nextSession = moment();
    if (nextSession.minutes() < 30) {
      nextSession.minutes(29);
      nextSession.seconds(59);
    } else {
      nextSession.minutes(59);
      nextSession.seconds(59);
    }
    return nextSession.toDate();
  }

  render() {
    let channelList = this.props.channelList;
    var currentUser = this.props.currentUser;
    var currentSessionList = this.props.currentSessionList || [];

    console.log('currentSessionList', currentSessionList);

    var renderButton = <span></span>;
    var countdownRender = <span></span>;
    if (this.isEnrolledCurrentSession(currentUser, currentSessionList)) {
      renderButton = <p>You enrolled the next session</p>
    } else {
      renderButton = <button className="button-primary" onClick={this.handdleEnrollNextSession.bind(this)}>Enroll next session</button>
    }

    if (typeof window !== 'undefined') {
    }
      countdownRender = (
        <div>
          <p>Ca học mới sẽ bắt đầu sau</p>
          <CountDown className="count-down"
            date={this.getNextSessionTime()}
            mins="phút" segs="giây" />
        </div>
      );

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <div className="main-content main-content--full-height">
            <HeaderBar title="Goingsunny" />

            <div className="main-content__wrapper">
              <div id='content-scroller' className="main-content__scroller">
                <div className="lesson-section">
                  {countdownRender}
                  {renderButton}
                </div>
              </div>
            </div>
          </div>

          <div className="room-panel"></div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
    currentUser: state.currentUser.toJS(),
    currentSessionList: state.appState.toJS().currentSessionList
  };
}

MeetingRoom.propTypes = {};
export { MeetingRoom };
export default connect(mapStateToProps)(withRouter(MeetingRoom));
