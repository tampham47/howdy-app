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
import UserInNextSession from 'components/UserInNextSession';
import client from 'middleware/mqtt';


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

    // window.unboxdAsyncInit = function() {
    //   Unboxd.init({
    //     clientId: "58624d1a5c5e932b3fa24116",
    //     version: "v1.0"
    //   });
    // };
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
    client.publish('join-class', JSON.stringify(curUser));
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
    if (utils.mobilecheck()) {
      setTimeout(function() {
        window.location.reload();
      }.bind(this), 3000);
    }
  }

  render() {
    var currentUser = this.props.currentUser;
    var userId = currentUser._id;
    var currentSessionList = this.props.currentSessionList || [];
    var renderButton = <span></span>;
    var countdownRender = <span></span>;

    console.log('prevSession', this.props.prevSession);

    if (!this.props.currentUser._id) {
      renderButton = (
        <div>
          <a href='/login/facebook' className="button button-primary facebook">Join the trip with facebook</a>
        </div>
      )
    } else {
      if (this.isEnrolledCurrentSession(currentUser, currentSessionList)) {
        renderButton = (
          <button className="__btn-joined">You had joined next session</button>
        )
      } else {
        renderButton = (
          <button className="__btn-join button-primary"
            onClick={this.handdleEnrollNextSession.bind(this)}>Join next session</button>
        )
      }
    }

    countdownRender = (
      <div className="count-down">
        <p className="count-down__helper">Next session is going to start in</p>
        <CountDown className="count-down__clock" mins="mins" segs="secs"
          date={this.state.nextSession}
          onEnd={this.onCountDownCompleted.bind(this)} />
      </div>
    );

    return (
      <div className="count-down-section">
        {countdownRender}
        {renderButton}

        { this.props.prevSession.roomName &&
          <Link to={`/c/${this.props.prevSession.roomName}`} className="__btn-link">
            Join previous session <i className="fa fa-chevron-right"></i>
          </Link>
        }
        <Link to='/guide' className="__btn-link">
          Guide <i className="fa fa-chevron-right"></i>
        </Link>
        <Link to="/c/test-your-devices" className="__btn-link">
          Check your device <i className="fa fa-chevron-right"></i>
        </Link>
        <a href="//m.me/goingsunny522" target="_blank" className="__btn-link">
          Give us your feedback <i className="fa fa-chevron-right"></i>
        </a>
        <UserInNextSession userInNextSession={this.props.userInNextSession} />
      </div>
    );
  }
}

CountDownComp.propTypes = {};
export default connect()(withRouter(CountDownComp));
