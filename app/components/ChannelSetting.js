/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ChannelSetting extends Component {
  render() {
    return (
      <section className="channel-setting">
        <h5>CHANNEL SETTING</h5>
        <p>This feature will coming soon.</p>
      </section>
    )
  }
}

ChannelSetting.propTypes = {};
export default connect()(ChannelSetting);
