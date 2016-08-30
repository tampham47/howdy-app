/**
 * gsun2016
 * tw
 */

import { CALL_API, CHAIN_API } from 'middleware/api';

export const CHANEL_CHANGED = Symbol('CHANEL_CHANGED');
export const CHANNEL_LOADED = Symbol('CHANNEL_LOADED');
export const NEW_MESSAGE = Symbol('NEW_MESSAGE');

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
