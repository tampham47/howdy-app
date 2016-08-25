/**
 *
 */

import * as ActionType from 'actions/message-panel';
import Immutable from 'immutable';

let defaultState = Immutable.fromJS([])
function messagePanelReducer (state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_PROFILE:
      return Immutable.fromJS(action.response)
      break
    default:
      return state
  }
}

export default messagePanelReducer;
