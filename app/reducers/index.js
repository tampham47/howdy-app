/**
 * gsun2016
 * tw
 */

import { combineReducers } from 'redux';

import chanels from 'reducers/chanels';
import currentUser from 'reducers/currentUser';
import questions from 'reducers/questions';
import questionDetail from 'reducers/questionDetail';
import messagePanel from 'reducers/messagePanel';
import authUser from 'reducers/authUser';
import messages from 'reducers/messages';

const rootReducer = combineReducers({
  chanels,
  currentUser,
  messagePanel,
  authUser,
  questions,
  questionDetail,
  messages,
});

export default rootReducer;
