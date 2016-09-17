/**
 *
 */

import Immutable from 'immutable';
let defaultState = Immutable.fromJS({
  notifications: [],
});

function authUserReducer(state = defaultState, action) {
  switch(action.type) {
    case action.LOADED_USER_NOTIFICATIONS:
      return state.set('notifications', action.response);
    default:
      return state;
  }
}

export default authUserReducer;
