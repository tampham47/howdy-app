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
    case ActionType.CHANNEL_LOADED:
      return state.setIn(['chanelList'], Immutable.fromJS(action.response));
      break;
    default:
      return state;
  }
}

export default chanelsReducer;
