/**
 *
 */

import { combineReducers } from 'redux';
import questions from 'reducers/questions';
import questionDetail from 'reducers/questionDetail';
import messagePanel from 'reducers/messagePanel';

const rootReducer = combineReducers({
  questions,
  questionDetail,
  messagePanel
});

export default rootReducer;
