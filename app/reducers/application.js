/**
 *
 */

import Immutable from 'immutable';
import * as AppStateType from 'actions/application';
import * as ChannelType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  notificationPanelState: false,
  currentPost: {}
});

function appStateReducer(state = defaultState, action) {
  switch(action.type) {
    case AppStateType.UPDATED_NOTIFICATION_PANEL_STATE:
      return state.set('notificationPanelState', action.response);

    case ChannelType.LOADED_POST_BY_SLUG:
      return state.set('currentPost', action.response ? action.response[0] : {});

    default:
      return state;
  }
}

export default appStateReducer;
