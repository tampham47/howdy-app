/**
 * tw
 */

import goingsunny from 'middleware/debug';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { enrollNextSession, loadCurrentSession } from 'actions/application';
import * as ApplicationType from 'actions/application';
import utils from 'middleware/utils';
import listener from 'middleware/listener';
import moment from 'moment';
import config from 'config';
import CountDown from 'react-simple-countdown';


class CountDownComp extends Component {

  componentDidMount() {
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

  getNextSessionTime() {
    var nextSession = moment();
    if (nextSession.minutes() < 30) {
      nextSession.minutes(29);
      nextSession.seconds(59);
    } else {
      nextSession.minutes(59);
      nextSession.seconds(59);
    }
    return nextSession.toDate().toString();
  }

  render() {
    console.log('CountDown.render', this.props.currentUser, this.props.currentSessionList);

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
        <CountDown className="count-down" mins="phút" segs="giây"
          date={this.getNextSessionTime()} />
        <p>Ca học mới sẽ bắt đầu sau</p>
      </div>
    );

    return (
      <div className="count-down-section">
        {countdownRender}
        {renderButton}
        <p>Đã có 15 người tham gia</p>
        <Link to="/c/test-your-devices" className="button button-link">Kiểm tra thiết bị</Link>
      </div>
    );
  }
}

CountDownComp.propTypes = {};
export default connect()(withRouter(CountDownComp));
