/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/application';
import _ from 'lodash';

let defaultState = Immutable.fromJS({});

function currentUserReducer(state = defaultState, action) {
  switch (action.type) {

    case ActionType.UPDATED_PROFILE:
      return state.merge(action.response);

    default:
      return state;
  }
}

export default currentUserReducer;
