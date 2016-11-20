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
      alert(`You will be lead to classroom: ${e.detail.channel}`);
      this.props.router.push(`/c/${e.detail.channel}`);
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

    var renderButton = <span></span>;
    var countdownRender = <span></span>;

    if (this.isEnrolledCurrentSession(currentUser, currentSessionList)) {
      renderButton = <p>Bạn đã đăng ký tham gia lớp học kế tiếp</p>
    } else {
      renderButton = (
        <button className="button-primary"
          onClick={this.handdleEnrollNextSession.bind(this)}>Tham gia lớp học</button>
      )
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
        <main className="main-area">
          <div className="room-panel">
            <div className="room-panel__wrapper">
              <div className="count-down-section">
                {countdownRender}
                {renderButton}
                <p>Đã có 15 người tham gia</p>

                <Link to="/c/test-your-devices" className="button button-link">Kiểm tra thiết bị</Link>
              </div>
            </div>
          </div>

          <div className="main-content main-content--full-height">
            <HeaderBar title="goingsunny" />

            <div className="main-content__wrapper">
              <div id='content-scroller' className="main-content__scroller">
                <div className="lesson-section">
                  <img src="/uploads/b_dialogues_everyday_conversations_english_lo_0-05.png" alt=""/>
                  <img src="/uploads/b_dialogues_everyday_conversations_english_lo_0-06.png" alt=""/>
                  <img src="/uploads/b_dialogues_everyday_conversations_english_lo_0-07.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
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
