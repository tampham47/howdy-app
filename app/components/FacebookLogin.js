/**
 *
 */

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { loadProfileByToken } from 'actions/application';
import AppStorage from 'middleware/AppStorage';

class ReactComp extends Component {

  componentDidMount() {
    var data = AppStorage.getData();
    if (data && data.accessToken) {
      this.props.dispatch(loadProfileByToken({ accessToken: data.accessToken }));
    }
  }

  responseFacebook(res) {
    AppStorage.setProps({
      accessToken: res.accessToken
    });
    this.props.dispatch(loadProfileByToken({ accessToken: res.accessToken }));
  }

  render() {
    return (
      <FacebookLogin cssClass="button button-primary facebook"
        appId="1391679424181926" autoLoad={true} fields="name,email,picture"
        scope="public_profile"
        callback={this.responseFacebook.bind(this)} />
    )
  }
}

ReactComp.propTypes = {};
export default connect()(withRouter(ReactComp));
