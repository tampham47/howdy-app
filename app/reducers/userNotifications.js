/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import * as AppType from 'actions/application';
import _ from 'lodash';
let defaultState = Immutable.fromJS([]);

function userNotificationsReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_USER_NOTIFICATIONS:
      return Immutable.fromJS(action.response);

    case AppType.UPDATED_NOTIFICATION_AS_READ:
      return state.push(action.response);

    default:
      return state;
  }
}

export default userNotificationsReducer;
