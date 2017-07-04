/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { openAppearinRoom } from 'actions/chanels';

class MessageItem extends Component {

  handleRoomClicked(message) {
    this.props.openAppearinRoom(message);
  }

  render() {
    var m = this.props.datacontext;
    var render;
    switch (m.type) {
      case 'appearin-room':
        render = (
          <p>
            <a onClick={this.handleRoomClicked.bind(this, m)} href="javascript:;">ROOM - {m.content}</a>
          </p>
        );
        break;
      default:
        render = (
          <p>{m.content}</p>
        );
    }

    return render;
  }
}

MessageItem.propTypes = {};
export default connect(null, { openAppearinRoom })(MessageItem);
