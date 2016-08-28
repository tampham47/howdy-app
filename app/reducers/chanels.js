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
    goingsunny: [],
    englishtown: [],
    englisheasy: []
  }
});

function chanelsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHANEL_CHANGED:
      return state.setIn(['currentChanel'], action.response.chanel);
      break;
    case ActionType.CHANEL_LOADED:
      break;
    case ActionType.NEW_MESSAGE:
      console.log('NEW_MESSAGE', action.response);
      var chanelId = action.response.chanelId;
      var messageList = state.getIn(['messagesInChanel', chanelId]);
      console.log('NEW_MESSAGE', typeof messageList);
      if (typeof messageList !== 'undefined') {
        return state.updateIn(['messagesInChanel', chanelId], list => list.push(action.response));
      } else {
        return state.setIn(['messagesInChanel', chanelId], [action.response]);
      }
      break;
    default:
      return state;
  }
}

export default chanelsReducer;
