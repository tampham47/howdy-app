/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/appearin';

let defaultState = Immutable.fromJS({
  isAppearin: false,
  mode: 'min'
});

function appearinReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.SHOWED_APPEARIN:
      if (action.response) {
        return state
          .set('isAppearin', action.response)
          .set('mode', 'left');
      } else {
        return state
          .set('isAppearin', action.response)
          .set('mode', 'min');
      }
    case ActionType.CHANGED_MODE:
      return state.set('mode', action.response);
    default:
      return state;
  }
}

export default appearinReducer;
