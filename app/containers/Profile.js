/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadChannels } from 'actions/chanels';

class Profile extends Component {
  static fetchData({ store, params }) {
    return store.dispatch(loadChannels());
  }

  componentDidMount() {
    this.props.loadChannels();
  }

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <HeaderBar title='Profile' />

          <div className="main-content main-content--expand">
            <p>Profile</p>
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
  };
}

Profile.propTypes = {};
export { Profile };
export default connect(mapStateToProps, { loadChannels })(Profile);
