/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';
let defaultState = Immutable.fromJS([]);

function userNotificationsReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_USER_NOTIFICATIONS:
      return Immutable.fromJS(action.response);
    default:
      return state;
  }
}

export default userNotificationsReducer;
