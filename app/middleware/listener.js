/**
 * 2016 gsun
 * tw
 */

let Listener = function() {};
let _callbackList = {};

Listener.prototype.sub = function(actionType, callback) {
  if (typeof window !== 'undefined') {
    window.addEventListener(actionType, callback);
    _callbackList[actionType] = callback;
  }
};

Listener.prototype.pub = function({ action }) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(action.type.toString(), {
      detail: action.response
    }));
  }
};

Listener.prototype.unsub = function({ actionType }) {
  if (typeof window !== 'undefined') {
    window.removeEventListener(actionType, _callbackList[actionType]);
    delete _callbackList[actionType];
  }
};

export default new Listener();
