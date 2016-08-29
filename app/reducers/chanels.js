/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  currentChanel: 'goingsunny',
  chanelList: [],
  messagesInChanel: {}
});

function chanelsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHANEL_CHANGED:
      return state.setIn(['currentChanel'], action.response.chanel);
      break;
    case ActionType.CHANEL_LOADED:
      break;
    case ActionType.NEW_MESSAGE:
      var chanelId = action.response.chanelId;
      var messageList = state.getIn(['messagesInChanel', chanelId]);
      if (typeof messageList == `undefined`) {
        state = state.setIn(['messagesInChanel', chanelId], Immutable.List.of());
      }
      return state.updateIn(['messagesInChanel', chanelId], list => list.push(action.response));
      break;
    default:
      return state;
  }
}

export default chanelsReducer;
