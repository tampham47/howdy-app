/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS([]);

function userReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_USER:
      return Immutable.fromJS(action.response);

    default:
      return state;
  }
}

export default userReducer;
