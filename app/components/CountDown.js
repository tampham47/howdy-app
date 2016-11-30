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

  constructor(props) {
    super(props);

    this.state = {
      nextSession: this.getNextSessionTime()
    };
  }

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

  onCountDownCompleted() {
    setTimeout(function() {
      this.setState({
        nextSession: this.getNextSessionTime()
      });
    }.bind(this), 3);
  }

  render() {
    var currentUser = this.props.currentUser;
    var currentSessionList = this.props.currentSessionList || [];
    var renderButton = <span></span>;
    var countdownRender = <span></span>;

    if (this.isEnrolledCurrentSession(currentUser, currentSessionList)) {
      renderButton = (
        <button className="count-down-section__btn-joined">Đã tham gia</button>
      )
    } else {
      renderButton = (
        <button className="count-down-section__btn-join button-primary"
          onClick={this.handdleEnrollNextSession.bind(this)}>Tham gia lớp học</button>
      )
    }

    countdownRender = (
      <div className="count-down">
        <p className="count-down__helper">Ca học mới sẽ bắt đầu sau</p>
        <CountDown className="count-down__clock" mins="phút" segs="giây"
          date={this.state.nextSession}
          onEnd={this.onCountDownCompleted.bind(this)} />
      </div>
    );

    return (
      <div className="count-down-section">
        {countdownRender}
        {renderButton}
        {/*<p className="count-down-section__info">Đã có 15 người tham gia</p>*/}
        <Link to="/c/test-your-devices" className="count-down-section__btn-test">Kiểm tra thiết bị <i className="fa fa-chevron-right"></i></Link>
      </div>
    );
  }
}

CountDownComp.propTypes = {};
export default connect()(withRouter(CountDownComp));
