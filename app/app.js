/**
 * gsun2016
 * Tw
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import configureStore from 'store/configureStore';
import createRoutes from 'routes';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';

let reduxState = {};
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(unescape(__REDUX_STATE__))
    _.each(plain, (val, key)=> {
      reduxState[key] = Immutable.fromJS(val)
    });
  } catch (e) {
  }
}

const store = configureStore(reduxState);
const authUser = reduxState.currentUser ? reduxState.currentUser.toJS() : {};
// console.log('ReduxState', authUser);
// console.log('STORE', store);

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory, authUser) }
  </Provider>
), document.getElementById('root'))
