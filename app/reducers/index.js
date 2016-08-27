/**
 *
 */

import { combineReducers } from 'redux';
import questions from 'reducers/questions';
import questionDetail from 'reducers/questionDetail';
import messagePanel from 'reducers/messagePanel';
import authUser from 'reducers/authUser';

const rootReducer = combineReducers({
  questions,
  questionDetail,
  messagePanel,
  authUser
});

export default rootReducer;
