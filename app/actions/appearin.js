/**
 *
 */

import { CALL_API, CHAIN_API } from 'middleware/api';

export const SHOWED_APPEARIN = Symbol('SHOWED_APPEARIN');
export const CHANGED_MODE = Symbol('CHANGED_MODE');

export function showAppearin(payload) {
  return {
    type: SHOWED_APPEARIN,
    response: payload
  };
}

export function changeMode(payload) {
  return {
    type: CHANGED_MODE,
    response: payload
  };
}
