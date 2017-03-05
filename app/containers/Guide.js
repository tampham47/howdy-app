/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import IntroComp from 'components/IntroComp';

class Login extends Component {

  render() {
    return (
      <div className="wave-wrapper">
        <Link to="/" className="button wave-wrapper__close">x</Link>
        <div className="container">
          <div className="brand">
            <img src="//image.flaticon.com/icons/svg/123/123894.svg" alt="" />
            <h1>goingsunny</h1>
            <p>fake it 'til you make it</p>

            {/*<a href='/login/facebook' className="button button--join-the-trip">Join the trip with facebook</a>*/}
          </div>

          <IntroComp />
        </div>
        <footer>
          <div className="wave"></div>
        </footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.toJS()
  };
}

Login.propTypes = {
};

export { Login };
export default connect(mapStateToProps)(withRouter(Login));
