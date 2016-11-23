/**
 * 2016 nau
 * tw
 */

let Listener = function() {};
let _eventList = {};

Listener.prototype.fakeFetchDone = function() {
  window.dispatchEvent(new CustomEvent('FAKE_FETCH_SUCCESS', {
    detail: true
  }));
};

Listener.prototype.sub = function(actionType, callback) {
  if (typeof window === 'undefined') { return; }

  _eventList[actionType] = callback;
  window.addEventListener(actionType, callback);
};

Listener.prototype.unsub = function(actionType, callback) {
  if (typeof window === 'undefined') { return; }

  window.removeEventListener(actionType, callback || _eventList[actionType]);
};

Listener.prototype.pub = function({ action }) {
  if (!action) {return;}
  if (typeof window === 'undefined') { return; }

  window.dispatchEvent(new CustomEvent(action.type.toString(), {
    detail: action.response
  }));
};

export default new Listener();
