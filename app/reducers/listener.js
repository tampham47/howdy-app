/**
 * 2016 gsun
 * tw
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/currentUser';
import _ from 'lodash';
import listener from 'middleware/listener';

let defaultState = Immutable.fromJS({});

function listenerReducer(state = defaultState, action) {
  console.log('listenerReducer', state, action);
  setTimeout(function() {
    listener.pub({ action });
  }, 0);
  return state;
}

export default listenerReducer;
