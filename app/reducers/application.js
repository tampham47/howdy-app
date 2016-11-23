/**
 *
 */

import Immutable from 'immutable';
import * as AppStateType from 'actions/application';
import * as ChannelType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  notificationPanelState: false,
  currentPost: {},
  currentSessionList: Immutable.fromJS([])
});

function appStateReducer(state = defaultState, action) {
  switch(action.type) {
    case AppStateType.UPDATED_NOTIFICATION_PANEL_STATE:
      return state.set('notificationPanelState', action.response);

    case ChannelType.LOADED_POST_BY_SLUG:
      return state.set('currentPost', action.response ? action.response[0] : {});

    case ChannelType.LOADED_CURRENT_SESSION_LIST:
      return state.set('currentSessionList', Immutable.fromJS(action.response));

    case AppStateType.ENROLLED_NEXT_SESSION:
      return state.updateIn(['currentSessionList'], list => list.push(action.response));

    default:
      return state;
  }
}

export default appStateReducer;
