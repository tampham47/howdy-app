/**
 *
 */

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { loadProfileByToken } from 'actions/application';

class ReactComp extends Component {

  responseFacebook(res) {
    this.props.dispatch(loadProfileByToken({ accessToken: res.accessToken }));
  }

  render() {
    return (
      <FacebookLogin cssClass="button button-primary facebook"
        appId="1391679424181926" autoLoad={false} fields="name,email,picture"
        callback={this.responseFacebook.bind(this)} />
    )
  }
}

ReactComp.propTypes = {};
export default connect()(withRouter(ReactComp));
