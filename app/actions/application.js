/**
 *
 */

import { CALL_API, CHAIN_API } from 'middleware/api';
export const UPDATED_NOTIFICATION_PANEL_STATE = Symbol('UPDATED_NOTIFICATION_PANEL_STATE');
export const UPDATED_NOTIFICATION_AS_READ = Symbol('UPDATED_NOTIFICATION_AS_READ');
export const UPDATED_PROFILE = Symbol('UPDATED_PROFILE');
export const ADDED_FEEDBACK = Symbol('ADDED_FEEDBACK');
export const LOADED_POST_BY_SLUG = Symbol('LOADED_POST_BY_SLUG');
export const UPDATED_LAST_ACCESSED = Symbol('UPDATED_LAST_ACCESSED');
export const ENROLLED_NEXT_SESSION = Symbol('ENROLLED_NEXT_SESSION');
export const LOADED_CURRENT_SESSION_LIST = Symbol('LOADED_CURRENT_SESSION_LIST');
export const GOT_BROKER_MESSAGE = Symbol('GOT_BROKER_MESSAGE');
export const NEW_USER_JOINED = Symbol('NEW_USER_JOINED');
export const ON_NEW_SESSION = Symbol('ON_NEW_SESSION');


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

export function addFeedback(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/enquiry',
      body: payload,
      successType: ADDED_FEEDBACK
    }
  };
}

export function loadPostBySlug(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/post',
      query: {
        query: JSON.stringify({
          slug: payload.slug
        })
      },
      successType: LOADED_POST_BY_SLUG
    }
  };
}

export function updateLastAccessed(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: `/user/${payload.id || payload._id}`,
      body: {
        lastAccessedAt: new Date()
      },
      successType: UPDATED_LAST_ACCESSED
    }
  };
}

export function enrollNextSession(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/session',
      body: payload,
      successType: ENROLLED_NEXT_SESSION
    }
  };
}

export function loadCurrentSession(payload) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/session',
      query: {
        query: JSON.stringify({
          sessionName: payload.sessionName
        })
      },
      successType: LOADED_CURRENT_SESSION_LIST
    }
  };
}

export function getBrokerMessage(payload) {
  return {
    type: GOT_BROKER_MESSAGE,
    response: payload
  };
}

export function userJoinNextSession(payload) {
  return {
    type: NEW_USER_JOINED,
    response: payload
  };
}
