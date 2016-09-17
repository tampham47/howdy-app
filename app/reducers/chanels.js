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
  isShowAddChannelComp: false,
  currentLesson: {}
});

function chanelsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.CHANEL_CHANGED:
      return state.setIn(['currentChanel'], action.response.channelUrl);

    case ActionType.CHANNEL_LOADED:
      return state.setIn(['chanelList'], Immutable.fromJS(action.response));

    case ActionType.SHOWED_ADD_CHANNEL_COMP:
      return state.set('isShowAddChannelComp', action.response);

    case ActionType.LOADED_LESSON_BY_CURRENT_DATE:
      return state.set('currentLesson', action.response && action.response[0]);

    case ActionType.ADDED_CHANNEL:
      return state
        .set('isShowAddChannelComp', false)
        .updateIn(['chanelList'], list => list.push(action.response));

    default:
      return state;
  }
}

export default chanelsReducer;
