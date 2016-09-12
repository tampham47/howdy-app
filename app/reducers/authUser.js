/**
 *
 */

import Immutable from 'immutable';
let defaultState = Immutable.fromJS({
  profile: {},
  userNotifications: [],
});

function authUserReducer (state = defaultState) {
  return state;
}

export default authUserReducer;
