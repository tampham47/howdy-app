/**
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { changeChanel, loadChannels } from 'actions/chanels';

export default function requireAuthentication(Component, AuthComponent) {

  class Auth extends React.Component {

    static fetchData({ store, params }) {
      console.log('fetchData');
      return store.dispatch(loadChannels());
    }

    static getDefaultStore({ store, params }) {
      var { chanelId } = params;
      store.dispatch(changeChanel({ chanel: chanelId || 'goingsunny' }));
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

      if (propsData.currentUser.isAuthenticated === true) {
        return <Component {...this.props}/>
      } else {
        return <AuthComponent {...this.props} />
      }
    }
  }

  const mapStateToProps = (state) => ({
    token: state.authUser.token,
    userName: state.authUser.userName,
    isAuthenticated: state.authUser.isAuthenticated,
    currentUser: state.currentUser
  });

  Auth.propTypes = {
    currentUser: PropTypes.object.isRequired
  }

  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      changeChanel,
      loadChannels
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Auth);

}
