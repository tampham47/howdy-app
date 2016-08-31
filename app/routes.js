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


export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={requireAuthentication(Chanel, Login)} />
        <Route path="channel/:channelUrl" component={requireAuthentication(Chanel, Login)} />
        <Route path="login" component={Login} />
        <Route path="explore" component={Explore} />
        <Route path="questions" component={Questions} />
        <Route path="questions/:id" component={Question} />
      </Route>
    </Router>
  );
};
