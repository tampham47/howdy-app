/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { List } from 'immutable';
import { changeChanel, showAddChannelComp, loadMessageByChannel, loadMessages } from 'actions/chanels';
import { changeMode } from 'actions/appearin';

class LeftMenu extends Component {

  handleChanelChange(channelUrl) {
    this.props.changeChanel({ channelUrl });
    this.props.loadMessages({ channelUrl });
    this.props.router.push(`/channel/${channelUrl}`);
  }

  handleAddChannel() {
    this.props.showAddChannelComp(true);
  }

  render() {
    console.log('chanelList', this.props.chanelList);

    return (
      <nav className="left-menu">
        <ul className="left-menu-room-list">
          {/*<li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/profile' className="left-menu-room-item-name">Tam Pham</Link>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/people' className="left-menu-room-item-name">People</Link>
          </li>
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/explore' className="left-menu-room-item-name">Explore</Link>
          </li>
          <li><h6>Channels</h6></li>*/}
          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/profile' className="left-menu-room-item-name">Your Profile</Link>
          </li>
          {this.props.chanelList.map(function(e) {
            return (
              <li className="left-menu-room-item" key={e.id}>
                <div className="left-menu-room-item-icon"></div>
                <a href="javascript:;" onClick={this.handleChanelChange.bind(this, e.url)}
                  className="left-menu-room-item-name">{e.name}</a>
              </li>
            );
          }.bind(this))}
        </ul>

        <button className="left-menu__new-room-btn button-primary"
          onClick={this.handleAddChannel.bind(this)}>Add a chanel</button>
      </nav>
    )
  }
}

LeftMenu.propTypes = {};
LeftMenu.defaultProps = {
  chanelList: []
};

var mapDispatchToProps = {
  changeChanel,
  changeMode,
  showAddChannelComp,
  loadMessageByChannel,
  loadMessages
}
export default connect(null, mapDispatchToProps)(withRouter(LeftMenu));
