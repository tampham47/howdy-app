/**
 *
 */

import Immutable from 'immutable';
import * as AppStateType from 'actions/application';
import * as ChannelType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS({
  notificationPanelState: false,

});

function appStateReducer(state = defaultState, action) {
  switch(action.type) {
    case AppStateType.UPDATED_NOTIFICATION_PANEL_STATE:
      return state.set('notificationPanelState', action.response);

    default:
      return state;
  }
}

export default appStateReducer;
