/**
 *
 */

import { CALL_API, CHAIN_API } from 'middleware/api';
export const UPDATED_NOTIFICATION_PANEL_STATE = Symbol('UPDATED_NOTIFICATION_PANEL_STATE');


export function updateNotificationPanelState(payload) {
  return {
    type: UPDATED_NOTIFICATION_PANEL_STATE,
    response: payload
  };
}
