/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp, addChannel } from 'actions/chanels';


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
  }

  render() {
    var isActive = this.props.isActive ? '_active' : '';
    var notificationList = this.props.notifications.map(function(i) {
      return (
        <li>{i.content}</li>
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
    currentUser: state.currentUser
  };
}


NotificationPanel.propTypes = {};
export default connect(mapStateToProps, { showAddChannelComp, addChannel })(NotificationPanel);
