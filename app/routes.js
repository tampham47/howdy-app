/**
 * gsun2016
 * tw
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Goingsunny from 'containers/Goingsunny';

// import Login from 'containers/Login';
// import Guide from 'containers/Guide';
// import Profile from 'containers/Profile';
// import Feedback from 'containers/Feedback';

// These are going to deprecated
// import Intro from 'containers/Intro';
// import Explore from 'containers/Explore';
// import Blog from 'containers/Blog';
// import MeetingRoom from 'containers/MeetingRoom';
// import Chanel from 'containers/Chanel';
// import ClassRoom from 'containers/ClassRoom';
// import requireAuthentication from 'containers/Auth';

var NoMatchComp;
let requireAuth = function(store, nextState, replace) {
  var u = store.getState().currentUser && store.getState().currentUser.toJS();
  console.log('>>> REQUIREAUTH', u, u.id);

  if (!u.id) {
    // Not authenticated, redirect to login.
    var p = nextState.location.pathname;
    replace('/login');
  }
};

let handleChangeUrl = function(state, nextState) {
  // ga track, ga is a global variable
  /*global ga*/
  if ((typeof ga !== 'undefined') && (typeof ga === 'function')) {
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
  }
};

export default function(history, store) {
  return (
    <Router history={history}>
      <Route path="/" component={App} onChange={handleChangeUrl.bind(this)} >
        <IndexRoute component={Goingsunny} />

        {/*<Route path="profile" component={Profile} onEnter={requireAuth.bind(this, store)} />
        <Route path="feedback" component={Feedback} onEnter={requireAuth.bind(this, store)} />
        <Route path="guide" component={Guide} />
        <Route path="login" component={Login} />*/}

        <Route path="*" component={NoMatchComp} />
      </Route>
    </Router>
  );
};
