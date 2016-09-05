/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  currentChanel: 'goingsunny',
  chanelList: [],
  messagesInChanel: {},
  isShowAddChannelComp: false
});

function chanelsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHANEL_CHANGED:
      return state.setIn(['currentChanel'], action.response.channelUrl);
    case ActionType.CHANNEL_LOADED:
      return state.setIn(['chanelList'], Immutable.fromJS(action.response));
    case ActionType.SHOWED_ADD_CHANNEL_COMP:
      return state.set('isShowAddChannelComp', action.response);
    default:
      return state;
  }
}

export default chanelsReducer;
