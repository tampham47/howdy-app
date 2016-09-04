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

var requireAuth = function(currentUser, nextState, replace) {
  console.log('requireAuth', nextState.location.pathname);

  if (!(currentUser && currentUser.isAuthenticated)) {
    // Not authenticated, redirect to login.
    replace({ nextPathname: nextState.location.pathname }, '/login');
  }
};

export default function(history, currentUser) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Chanel} onEnter={requireAuth.bind(this, currentUser)} />
        <Route path="channel/:channelUrl" component={Chanel} onEnter={requireAuth.bind(this, currentUser)} />

        <Route path="login" component={Login} />
        <Route path="explore" component={Explore} />
      </Route>
    </Router>
  );
};
