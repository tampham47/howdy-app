/**
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { changeChanel, loadChannels, loadMessageByChannel } from 'actions/chanels';

export default function requireAuthentication(MainComponent, AuthComponent) {

  class Auth extends React.Component {

    static fetchData({ store, params }) {
      var { channelUrl } = params;
      return store.dispatch(loadMessageByChannel(channelUrl));
    }

    static getDefaultStore({ store, params }) {
      var { channelUrl } = params;
      store.dispatch(changeChanel({ chanel: channelUrl || 'goingsunny' }));
    }

    componentDidMount() {
      console.log('Auth.componentDidMount');
      this.props.loadMessageByChannel('');
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
        return <MainComponent {...this.props} />;
      } else {
        return <AuthComponent {...this.props} />;
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
      loadChannels,
      loadMessageByChannel
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Auth);

}
