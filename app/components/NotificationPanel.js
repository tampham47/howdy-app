/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp, addChannel } from 'actions/chanels';
import { updateNotificationPanelState, updateNotificationAsRead } from 'actions/app-state';


class NotificationPanel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleCancelButton() {
  }

  handleSubmitButton() {
    console.log('handleSubmitButton');
    var notiList = this.props.unreadNotiList;
    var user = this.props.currentUser;

    this.props.updateNotificationPanelState(false);
    this.props.updateNotificationAsRead(notiList, user);
  }

  render() {
    console.log('NotificationPanel.render', this.props.currentUser);

    var isActive = this.props.isActive ? '_active' : '';
    var notificationList = this.props.unreadNotiList.map(function(i) {
      return (
        <li key={i.id}>{i.content}</li>
      );
    });

    return (
      <div className={`notification-p ${isActive}`}>
        <div className="notification-p__wrapper">
          <div className="container">
            <div className="columns eight offset-by-two">
              <div className="notification-p__content">
              <ul className="notification-list">
                { notificationList }
              </ul>

                <div className="u-pull-right">
                  <button onClick={this.handleSubmitButton.bind(this)}>OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.toJS()
  };
}
var mapDispatchToProps = {
  showAddChannelComp,
  addChannel,
  updateNotificationPanelState,
  updateNotificationAsRead
};


NotificationPanel.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanel);
