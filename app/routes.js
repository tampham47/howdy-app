/**
 * gsun2016
 * tw
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Intro from 'containers/Intro';
import MessagePanel from 'containers/MessagePanel';
import Questions from 'containers/Questions';
import Question from 'containers/Question';
import Login from 'containers/Login';
import Explore from 'containers/Explore';


var onAuth = function(nextState, replace) {
  // const { getState } = this.props;
  // console.log('onAuth', getState);

  // Use my reselect selector to determine if we are authenticated or not
  // Obviously this is not complete, but at this point it's easy to redirect or
  // initiate an action in order to login via cookie or whatever
  // if (!isLoggedIn(getState())) {
  //   console.log("Not logged in");
  // } else {
  //   console.log('We are already logged in');
  // }
};

export default function(history, isAuth) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MessagePanel} onEnter={onAuth} />
        <Route path="login" component={Login} />
        <Route path="explore" component={Explore} />
        <Route path="questions" component={Questions} />
        <Route path="questions/:id" component={Question} />
      </Route>
    </Router>
  );
};
