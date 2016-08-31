/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS([]);

function messagesReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_MESSAGES:
      console.log('LOADED_MESSAGES', action.response);
      return Immutable.fromJS(action.response);
      break;
    case ActionType.NEW_MESSAGE:
      return state.push(action.response);
      break;
    default:
      return state;
  }
}

export default messagesReducer;
