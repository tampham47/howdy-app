/**
 *
 */

import Immutable from 'immutable';
import * as ActionType from 'actions/chanels';
import _ from 'lodash';

let defaultState = Immutable.fromJS([]);

function messagesReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_MESSAGES:
      var l = _.sortBy(action.response, function(i) {
        return i.createdAt;
      });
      return Immutable.fromJS(l);

    case ActionType.NEW_MESSAGE:
      return state.push(action.response);

    default:
      return state;
  }
}

export default messagesReducer;
