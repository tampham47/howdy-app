/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp, addChannel } from 'actions/chanels';


class NotificationPanel extends Component {

  handleCancelButton() {
  }

  handleSubmitButton() {
  }

  componentDidMount() {
  }

  render() {
    var isActive = this.props.isActive ? '_active' : '';

    return (
      <div className={`notification-p ${isActive}`}>
        <div className="notification-p__wrapper">
          <div className="container">
            <div className="columns eight offset-by-two">
              <div className="notification-p__content">
                <p>NotificationPanel</p>

                <div className="u-pull-right">
                  <button>OK</button>
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
