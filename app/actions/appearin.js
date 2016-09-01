/**
 *
 */

import { CALL_API, CHAIN_API } from 'middleware/api';

export const SHOWED_APPEARIN = Symbol('SHOW_APPEARIN');

export function showAppearin(appearinRoom) {
  return {
    type: SHOW_APPEARIN,
    response: appearinRoom
  }
}
