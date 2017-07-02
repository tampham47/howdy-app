/**
 * gsun2016
 * tw
 */

import { CALL_API, CHAIN_API } from 'middleware/api';
import config from 'config';
import moment from 'moment';

// import { LOADED_CURRENT_SESSION_LIST } from 'actions/application';

export const SHOWED_ADD_CHANNEL_COMP = Symbol('SHOWED_ADD_CHANNEL_COMP');
export const CHANEL_CHANGED = Symbol('CHANEL_CHANGED');
export const CHANNEL_LOADED = Symbol('CHANNEL_LOADED');
export const NEW_MESSAGE = Symbol('NEW_MESSAGE');
export const ADDED_CHANNEL = Symbol('ADDED_CHANNEL');
export const OPENED_APPEARIN_ROOM = Symbol('OPENED_APPEARIN_ROOM');

export const LOADED_MESSAGES = Symbol('LOADED_MESSAGES');
export const LOADED_USER = Symbol('LOADED_USER');
export const LOADED_USER_NOTIFICATIONS = Symbol('LOADED_USER_NOTIFICATIONS');
export const LOADED_NOTIFICATIONS = Symbol('LOADED_NOTIFICATIONS');
export const LOADED_LESSON_BY_CURRENT_DATE = Symbol('LOADED_LESSON_BY_CURRENT_DATE');
export const LOADED_POST_BY_SLUG = Symbol('LOADED_POST_BY_SLUG');
export const LOADED_CURRENT_SESSION_LIST = Symbol('LOADED_CURRENT_SESSION_LIST');
export const LOADED_PREV_SESSION = Symbol('LOADED_PREV_SESSION');
export const LOADED_USER_IN_SESSION = Symbol('LOADED_USER_IN_SESSION');


export function fetchChannelData({ channelUrl, userId, sessionName, prevSessionName, targetDate }) {
  return {
    [CHAIN_API]: [
      ()=> {
        var currentDateStr = moment().format('YYYYMMDD');
        if (targetDate) {
          currentDateStr = targetDate;
        }

        return {
          [CALL_API]: {
            method: 'get',
            path: '/lesson',
            query: {
              query: JSON.stringify({
                availableDateStr: currentDateStr
              })
            },
            successType: LOADED_LESSON_BY_CURRENT_DATE
          }
        };
      },
      (notifications)=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/usernotification',
            query: {
              query: JSON.stringify({
                _user: userId
              })
            },
            successType: LOADED_USER_NOTIFICATIONS
          }
        };
      },
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/notification',
            query: {
              query: JSON.stringify({
                state: 'public'
              })
            },
            successType: LOADED_NOTIFICATIONS
          }
        };
      },
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/session',
            query: {
              query: JSON.stringify({
                sessionName: sessionName
              }),
              'populate': '_user'
            },
            successType: LOADED_CURRENT_SESSION_LIST
          }
        }
      },
      ()=> {
        console.log('prevSessionName', prevSessionName, userId);
        if (!userId) return;
        return {
          [CALL_API]: {
            method: 'get',
            path: '/session',
            query: {
              query: JSON.stringify({
                sessionName: prevSessionName,
                _user: userId
              })
            },
            successType: LOADED_PREV_SESSION
          }
        }
      },
    ]
  }
}

export function fetchClassRoomData({ channelUrl, userId, sessionName, prevSessionName }) {
  return {
    [CHAIN_API]: [
      ()=> {
        var currentDateStr = moment().format('YYYYMMDD');
        return {
          [CALL_API]: {
            method: 'get',
            path: '/lesson',
            query: {
              query: JSON.stringify({
                availableDateStr: currentDateStr
              })
            },
            successType: LOADED_LESSON_BY_CURRENT_DATE
          }
        };
      },
      (notifications)=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/usernotification',
            query: {
              query: JSON.stringify({
                _user: userId
              })
            },
            successType: LOADED_USER_NOTIFICATIONS
          }
        };
      },
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/notification',
            query: {
              query: JSON.stringify({
                state: 'public'
              })
            },
            successType: LOADED_NOTIFICATIONS
          }
        };
      },
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/session',
            query: {
              query: JSON.stringify({
                roomName: channelUrl,
                sessionName: prevSessionName
              }),
              populate: '_user'
            },
            successType: LOADED_USER_IN_SESSION
          }
        };
      }
    ]
  }
}

export function openAppearinRoom(payload) {
  return {
    type: OPENED_APPEARIN_ROOM,
    response: payload
  };
}

export function showAddChannelComp(payload) {
  return {
    type: SHOWED_ADD_CHANNEL_COMP,
    response: payload
  };
}

export function changeChanel({ channelUrl }) {
  return {
    type: CHANEL_CHANGED,
    response: {
      channelUrl
    }
  };
}

export function loadChannels() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/channel',
      query: {
        sort: JSON.stringify({ createdAt: 1 }),
      },
      successType: CHANNEL_LOADED
    }
  };
}

export function loadMessageAndChannel({ channelUrl }) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/channel',
            query: {
              sort: JSON.stringify({ createdAt: 1 }),
            },
            successType: CHANNEL_LOADED
          }
        };
      },
      (channels) => {

        return {
          [CALL_API]: {
            method: 'get',
            path: '/message',
            query: {
              limit: config.MESSAGE_LIMIT,
              sort: JSON.stringify({ createdAt: -1 }),
              query: JSON.stringify({ channelUrl: channelUrl})
            },
            successType: LOADED_MESSAGES
          }
        }
      }
    ]
  }
}

export function loadMessages({ channelUrl }) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/message',
      query: {
        limit: config.MESSAGE_LIMIT,
        sort: JSON.stringify({ createdAt: -1 }),
        query: JSON.stringify({ channelUrl: channelUrl})
      },
      successType: LOADED_MESSAGES
    }
  }
}

export function loadMessageByChannel(channel) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/channel',
            query: {
              sort: JSON.stringify({ createdAt: 1 }),
            },
            successType: CHANNEL_LOADED
          }
        };
      },
      (channels) => {
        var channelList = [];
        channels.forEach(function(i) {
          channelList.push(i.url);
        });

        return {
          [CALL_API]: {
            method: 'get',
            path: '/message',
            query: {
              limit: config.MESSAGE_LIMIT,
              sort: JSON.stringify({ createdAt: -1 }),
              query: JSON.stringify({ channelUrl: channelUrl})
            },
            successType: LOADED_MESSAGES
          }
        }
      }
    ]
  }
}

export function addChannel(payload) {
  return {
    [CALL_API]: {
      method: 'post',
      path: '/channel',
      body: payload,
      successType: ADDED_CHANNEL
    }
  };
}

export function loadDataForBlog(payload) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/channel',
            query: {
              sort: JSON.stringify({ createdAt: 1 }),
            },
            successType: CHANNEL_LOADED
          }
        }
      },
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/post',
            query: {
              query: JSON.stringify({
                slug: payload.slug
              })
            },
            successType: LOADED_POST_BY_SLUG
          }
        }
      }
    ]
  };
}
