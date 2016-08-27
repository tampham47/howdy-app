/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  currentChanel: 'goingsunny',
  chanelList: [],
  messagesInChanel: {
    goingsunny: []
  }
});

function chanelsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHANEL_CHANGED:
      break;
    case ActionType.CHANEL_LOADED:
      break;
    case ActionType.NEW_MESSAGE:
      console.log('NEW_MESSAGE', action.response);
      return state.updateIn(['messagesInChanel', 'goingsunny'], list => list.push(action.response));
      break;
    default:
      return state;
  }
}

export default chanelsReducer;
