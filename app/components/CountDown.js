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
    // setTimeout(function() {
    //   window.location.reload();
    // }.bind(this), 3000);
  }

  render() {
    var currentUser = this.props.currentUser;
    var currentSessionList = this.props.currentSessionList || [];
    var renderButton = <span></span>;
    var countdownRender = <span></span>;

    console.log('currentUser', this.props.currentUser);
    if (!this.props.currentUser._id) {
      renderButton = (
        <div>
          <a href='/login/facebook' className="button button-primary facebook">Join the trip with facebook</a>
        </div>
      )
    } else {
      if (this.isEnrolledCurrentSession(currentUser, currentSessionList)) {
        renderButton = (
          <button className="__btn-joined">Đã tham gia ca học tiếp theo</button>
        )
      } else {
        renderButton = (
          <button className="__btn-join button-primary"
            onClick={this.handdleEnrollNextSession.bind(this)}>Tham gia ca học tiếp theo</button>
        )
      }
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

        <Link to='/guide' className="__btn-link">
          Link vào lớp học vừa rồi <i className="fa fa-chevron-right"></i>
        </Link>
        <Link to='/guide' className="__btn-link">
          Hướng dẫn <i className="fa fa-chevron-right"></i>
        </Link>
        <Link to="/c/test-your-devices" className="__btn-link">
          Kiểm tra thiết bị <i className="fa fa-chevron-right"></i>
        </Link>

        <div className="user-next-session">
          <h6 className="user-next-session__title">Khóa học kế tiếp</h6>
          <ul className="people-list">
            <li className="people-item">
              <span>Tam Pham</span>
              <div className="people-item__img-wrapper">
                <img src="http://orig11.deviantart.net/6719/f/2011/012/c/9/facebook_avatar_by_fyuvix-d372asb.jpg" />
              </div>
            </li>
            <li className="people-item">
              <span>Tam Pham 2</span>
              <div className="people-item__img-wrapper">
                <img src="http://culturahipster.com/wp-content/uploads/bitstrips-facebook-cultura-hipster-avatar.jpg" />
              </div>
            </li>
            <li className="people-item">
              <span>Tam Pham 3</span>
              <div className="people-item__img-wrapper">
                <img src="http://data.kenhsinhvien.net/files/2014/02/22/avatar-ep-kinh-9.jpg" />
              </div>
            </li>
          </ul>
          <small className="user-next-session__helper">Đã có 3 người tham gia !</small>
        </div>
      </div>
    );
  }
}

CountDownComp.propTypes = {};
export default connect()(withRouter(CountDownComp));
