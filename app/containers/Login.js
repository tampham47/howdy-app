/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { loadLoginDetail } from 'actions/Logins';

class Login extends Component {
  static fetchData({ store, params }) {
    // let { id } = params
    // return store.dispatch(loadLoginDetail({ id }))
  }

  componentDidMount() {
    // let { id } = this.props.params;
    // this.props.loadLoginDetail({ id });
  }

  render() {
    // let { Login } = this.props;

    return (
      <div className="goingmerry-bg">
        <div className="middle-wrapper">
          <h3 className="login-title">Login by</h3>
          <button className="button-primary">Continue with Facebook</button>
          <button className="">Continue with Google</button>
          <button className="">Continue with Twitter</button>
          <small>* we don't post any thing on your network</small>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

Login.propTypes = {
};

export { Login };
export default connect(mapStateToProps)(Login);