/**
 * gsun2016
 * tw
 */

import { CALL_API, CHAIN_API } from 'middleware/api';
import config from 'config';

export const LOADED_USER = Symbol('LOADED_USER');
export const SHOWED_ADD_CHANNEL_COMP = Symbol('SHOWED_ADD_CHANNEL_COMP');
export const CHANEL_CHANGED = Symbol('CHANEL_CHANGED');
export const CHANNEL_LOADED = Symbol('CHANNEL_LOADED');
export const NEW_MESSAGE = Symbol('NEW_MESSAGE');
export const LOADED_MESSAGES = Symbol('LOADED_MESSAGES');
export const ADDED_CHANNEL = Symbol('ADDED_CHANNEL');
export const OPENED_APPEARIN_ROOM = Symbol('OPENED_APPEARIN_ROOM');

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

export function fetchChannelData({ channelUrl }) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/user',
            successType: LOADED_USER
          }
        }
      },
      (users)=> {
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
