/**
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {pushState} from 'redux-router';

export default function requireAuthentication(Component, AuthComponent) {

  class AuthenticatedComponent extends React.Component {

    componentDidMount() {
      // console.log('AuthComponent', this.props.authUser.get('isAuthenticated'));
    }

    // componentWillMount() {
    //   this.checkAuth(this.props.isAuthenticated);
    // }

    // componentWillReceiveProps(nextProps) {
    //   this.checkAuth(nextProps.isAuthenticated);
    // }

    // checkAuth(isAuthenticated) {
    //   if (!isAuthenticated) {
    //     let redirectAfterLogin = this.props.location.pathname;
    //     this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
    //   }
    // }

    render() {
      var propsData = JSON.parse(JSON.stringify(this.props));
      console.log('AuthenticatedComponent', propsData);

      return (
        <div>
          {propsData.currentUser.isAuthenticated === true ? <Component {...this.props}/> : <AuthComponent {...this.props} />}
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    token: state.authUser.token,
    userName: state.authUser.userName,
    isAuthenticated: state.authUser.isAuthenticated,
    currentUser: state.currentUser
  });

  AuthenticatedComponent.propTypes = {
    currentUser: PropTypes.object.isRequired
  }

  return connect(mapStateToProps)(AuthenticatedComponent);

}