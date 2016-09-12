/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';
let defaultState = Immutable.fromJS([]);

function notificationsReducer(state = defaultState, action) {
  switch(action.type) {
    case action.LOADED_NOTIFICATIONS:
      return Immutable.fromJS(action.response);
    default:
      return state;
  }
}

export default notificationsReducer;
