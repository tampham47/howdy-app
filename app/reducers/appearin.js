/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/appearin';

let defaultState = Immutable.fromJS({
  isAppearin: false,
  mode: 'left'
});

function appearinReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.SHOWED_APPEARIN:
      return state.set('isAppearin', action.response);
    case ActionType.CHANGED_MODE:
      return state.set('mode', action.response);
    default:
      return state;
  }
}

export default appearinReducer;
