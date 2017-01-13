/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';
import FacebookLogin from 'react-facebook-login';

class PeopleInChannel extends Component {

  responseFacebook(res) {
    alert(JSON.stringify(res));
  }

  render() {
    return (
      <FacebookLogin cssClass="button button-primary facebook"
        appId="1391679424181926" autoLoad={false} fields="name,email,picture"
        callback={this.responseFacebook.bind(this)} />
    )
  }
}

PeopleInChannel.propTypes = {};
export default PeopleInChannel;
