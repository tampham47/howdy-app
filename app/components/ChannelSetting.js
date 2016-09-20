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
        <h5>Channel Information</h5>
        <p>{this.props.datacontext.description}</p>
      </section>
    )
  }
}

ChannelSetting.propTypes = {};
export default connect()(ChannelSetting);
