/**
 *
 */

import { CALL_API, CHAIN_API } from 'middleware/api';
export const UPDATED_NOTIFICATION_PANEL_STATE = Symbol('UPDATED_NOTIFICATION_PANEL_STATE');
export const UPDATED_NOTIFICATION_AS_READ = Symbol('UPDATED_NOTIFICATION_AS_READ');
export const UPDATED_PROFILE = Symbol('UPDATED_PROFILE');


export function updateNotificationPanelState(payload) {
  return {
    type: UPDATED_NOTIFICATION_PANEL_STATE,
    response: payload
  };
}

export function updateNotificationAsRead(notificationList, user) {
  var chainApi = [];
  var callApi = function(noti, user, v) {
    console.log('callApi', noti, user, v);
    return {
      [CALL_API]: {
        method: 'post',
        path: '/usernotification',
        body: {
          _user: (user._id || user.id),
          _notification: (noti._id || noti.id)
        },
        successType: UPDATED_NOTIFICATION_AS_READ
      }
    };
  };

  for (var i = 0; i < notificationList.length; i++) {
    chainApi.push(callApi.bind(null, notificationList[i], user));
  }

  return {
    [CHAIN_API]: chainApi
  };
}

export function updateProfile(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: `/user/${payload.id || payload._id}`,
      body: payload,
      successType: UPDATED_PROFILE
    }
  };
}
