/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/currentUser';
import _ from 'lodash';

let defaultState = Immutable.fromJS({});

function currentUserReducer(state = defaultState, action) {
  return state;
}

export default currentUserReducer;
