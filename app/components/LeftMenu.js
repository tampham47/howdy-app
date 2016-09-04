/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { List } from 'immutable';
import { changeChanel, showAddChannelComp } from 'actions/chanels';
import { changeMode } from 'actions/appearin';

class LeftMenu extends Component {

  handleChanelChange(chanel) {
    this.props.changeChanel({ chanel });
    this.props.router.push(`/channel/${chanel}`);
  }

  handleAddChannel() {
    this.props.showAddChannelComp(true);
  }

  render() {
    console.log('chanelList', this.props.chanelList);

    return (
      <nav className="left-menu">
        <ul className="left-menu-room-list">
          {this.props.chanelList.map(function(e) {
            return (
              <li className="left-menu-room-item" key={e.id}>
                <div className="left-menu-room-item-icon"></div>
                <a href="javascript:;" onClick={this.handleChanelChange.bind(this, e.url)}
                  className="left-menu-room-item-name">{e.name}</a>
              </li>
            );
          }.bind(this))}

          <li className="left-menu-room-item">
            <div className="left-menu-room-item-icon"></div>
            <Link to='/explore' className="left-menu-room-item-name">Explore</Link>
          </li>
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
export default connect(null, { changeChanel, changeMode, showAddChannelComp })(withRouter(LeftMenu));
