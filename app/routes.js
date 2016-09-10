/**
 * gsun2016
 * tw
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import requireAuthentication from 'containers/Auth';
import App from 'containers/App';
import Login from 'containers/Login';
import Chanel from 'containers/Chanel';
import Explore from 'containers/Explore';
import Questions from 'containers/Questions';
import Question from 'containers/Question';
import Intro from 'containers/Intro';

let requireAuth = function(store, nextState, replace) {
  var u = store.getState().currentUser && store.getState().currentUser.toJS();
  console.log('>>> REQUIREAUTH', u, (u.isAuthenticated || u.isAuthenticated == 'true'));

  if (!(u && (u.isAuthenticated || u.isAuthenticated == 'true'))) {
    // Not authenticated, redirect to login.
    var p = nextState.location.pathname;
    replace('/login');

    // replace({
    //   pathname: '/login',
    //   query: {
    //     nextstate: p
    //   }
    // });
  }
};

export default function(history, store) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Chanel} onEnter={requireAuth.bind(this, store)} />
        <Route path="channel/:channelUrl" component={Chanel} onEnter={requireAuth.bind(this, store)} />

        <Route path="login" component={Login} />
        <Route path="explore" component={Explore} />
      </Route>
    </Router>
  );
};
