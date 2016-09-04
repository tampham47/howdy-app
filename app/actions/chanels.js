/**
 * gsun2016
 * tw
 */

import { CALL_API, CHAIN_API } from 'middleware/api';

export const SHOWED_ADD_CHANNEL_COMP = Symbol('SHOWED_ADD_CHANNEL_COMP');
export const CHANEL_CHANGED = Symbol('CHANEL_CHANGED');
export const CHANNEL_LOADED = Symbol('CHANNEL_LOADED');
export const NEW_MESSAGE = Symbol('NEW_MESSAGE');
export const LOADED_MESSAGES = Symbol('LOADED_MESSAGES');

export function showAddChannelComp(payload) {
  return {
    type: SHOWED_ADD_CHANNEL_COMP,
    response: payload
  };
}

export function changeChanel(chanel) {
  return {
    type: CHANEL_CHANGED,
    response: chanel
  }
}

export function loadChannels() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/channel',
      successType: CHANNEL_LOADED
    }
  }
};

export function loadMessageByChannel(channel) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            path: '/channel',
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
            path: `/message?query={"channelUrl":${JSON.stringify(channelList)}}`,
            successType: LOADED_MESSAGES
          }
        }
      }
    ]
  }

};

export function loadMessages(channel) {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/message?query={"channelUrl":"${channel}}"`,
      successType: LOADED_MESSAGES
    }
  }
}
