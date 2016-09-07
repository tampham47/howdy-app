/**
 * gsun2016
 * tw
 */

import { combineReducers } from 'redux';

import chanels from 'reducers/chanels';
import currentUser from 'reducers/currentUser';
import messages from 'reducers/messages';
import appearin from 'reducers/appearin';
import users from 'reducers/users';
import listener from 'reducers/listener';

// import questions from 'reducers/questions';
// import questionDetail from 'reducers/questionDetail';
// import messagePanel from 'reducers/messagePanel';
// import authUser from 'reducers/authUser';

const rootReducer = combineReducers({
  chanels,
  currentUser,
  messages,
  appearin,
  users,
  listener,
});

export default rootReducer;
