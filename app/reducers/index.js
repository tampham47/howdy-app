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
import notifications from 'reducers/notifications';
import userNotifications from 'reducers/userNotifications';
import appState from 'reducers/app-state';

// import questions from 'reducers/questions';
// import questionDetail from 'reducers/questionDetail';
// import messagePanel from 'reducers/messagePanel';
// import authUser from 'reducers/authUser';

const rootReducer = combineReducers({
  appState,
  chanels,
  currentUser,
  messages,
  appearin,
  users,
  notifications,
  userNotifications,
  listener,
});

export default rootReducer;
