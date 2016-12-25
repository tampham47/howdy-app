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
  prevSession: {},
  currentSessionList: Immutable.fromJS([]),
  userInNextSession: Immutable.fromJS([]),
});

function appStateReducer(state = defaultState, action) {
  switch(action.type) {
    case AppStateType.UPDATED_NOTIFICATION_PANEL_STATE:
      return state.set('notificationPanelState', action.response);

    case ChannelType.LOADED_POST_BY_SLUG:
      return state.set('currentPost', action.response ? action.response[0] : {});

    case ChannelType.LOADED_CURRENT_SESSION_LIST:
      console.log('LOADED_CURRENT_SESSION_LIST', action.response);
      var userList = [];
      var r = action.response || [];
      for (var i = 0; i < r.length; i++) {
        userList.push(r[i].user);
      }

      var userListData = r.map(function(i) {
        i._user = i.user.id;
        return i;
      })

      return state
        .set('currentSessionList', Immutable.fromJS(userListData))
        .set('userInNextSession', Immutable.fromJS(userList));

    case AppStateType.ENROLLED_NEXT_SESSION:
      return state.updateIn(['currentSessionList'], list => list.push(action.response));

    case AppStateType.NEW_USER_JOINED:
      return state.updateIn(['userInNextSession'], function(list) {
        if (!list) {
          var t = [];
          t.push(action.response);
          return Immutable.fromJS(t)
        } else {
          return list.push(action.response);
        }
      });

    case AppStateType.ON_NEW_SESSION:
      return state.set('userInNextSession', Immutable.fromJS([]));

    case ChannelType.LOADED_PREV_SESSION:
      var t = {};
      if (action.response.length) {
        t = action.response[0];
      }
      console.log('Prev', t);
      return state.set('prevSession', t);

    default:
      return state;
  }
}

export default appStateReducer;
