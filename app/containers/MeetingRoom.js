/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadDataForBlog } from 'actions/chanels';
import listener from 'middleware/listener';
import * as ApplicationType from 'actions/application';
import { enrollNextSession } from 'actions/application';


class MeetingRoom extends Component {

  // static fetchData({ store, params }) {
  //   var slug = params.slug;
  //   return store.dispatch(loadDataForBlog({ slug }));
  // }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handdleEnrollNextSession() {
    var curUser = this.props.currentUser;
    var payload = {
      _user: curUser.id || curUser._id
    };
    this.props.dispatch(enrollNextSession(payload));
  }

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <div className="main-content main-content--full-height">
            <HeaderBar title="Meeting Room" />

            <div className="main-content__wrapper">
              <div id='content-scroller' className="main-content__scroller">
                <button onClick={this.handdleEnrollNextSession.bind(this)}>Enroll next session</button>
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
    currentPost: state.appState.toJS().currentPost
  };
}

MeetingRoom.propTypes = {};
export { MeetingRoom };
export default connect(mapStateToProps)(MeetingRoom);
