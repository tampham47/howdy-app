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
import Questions from 'containers/Questions';
import Question from 'containers/Question';
import Login from 'containers/Login';
import Explore from 'containers/Explore';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="login" component={Login} />
        <Route path="explore" component={Explore} />
        <Route path="questions" component={Questions} />
        <Route path="questions/:id" component={Question} />
      </Route>
    </Router>
  );
};
