/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/appearin';

let defaultState = Immutable.fromJS({
  isAppearin: false
});

function appearinReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.SHOWED_APPEARIN:
      return Immutable.fromJS({
        isAppearin: true
      });
      break;
    default:
      return state;
  }
}

export default appearinReducer;
