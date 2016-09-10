/**
 * 2016 gsun
 * tw
 */

let Listener = function() {};

Listener.prototype.sub = function(actionType, callback) {
  if (typeof window !== 'undefined') {
    window.addEventListener(actionType, callback);
  }
};

Listener.prototype.pub = function({ action }) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(action.type.toString(), {
      detail: {
        payload: action.response
      }
    }));
  }
};

export default new Listener();
