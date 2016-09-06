/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

class Login extends Component {

  componentWillMount() {
    var user = {};
    if (this.props.currentUser && ('toJS' in this.props.currentUser)) {
      user = this.props.currentUser.toJS();
    }

    if (user.isAuthenticated) {
      this.props.router.push('/');
    }
  }

  componentDidMount() {}

  render() {

    return (
      <div className="goingmerry-bg">
        <div className="middle-wrapper">
          <h3 className="login-title">Login by</h3>
          <a href='/login/facebook' className="button button-primary">Continue with Facebook</a>
          {/*<Link to='/' className="button">Continue with Google</Link>
          <Link to='/' className="button">Continue with Twitter</Link>*/}
          <small>* we don't post any thing on your network</small>
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

Login.propTypes = {
};

export { Login };
export default connect(mapStateToProps)(withRouter(Login));
