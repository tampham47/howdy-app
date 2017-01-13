/**
 * 2016 nau
 * tw
 */

import _ from 'lodash';

var getFromLocalStorage = function(name) {
  var r = JSON.parse(localStorage.getItem(name)) || null;
  return r;
};
var setToLocalStorage = function(name, data) {
  var s = JSON.stringify(data);
  localStorage.setItem(name, s);
  return true;
};

var Storage = function(storageName) {
  this.storageName = storageName;
};

Storage.prototype.getData = function() {
  if (typeof localStorage === 'undefined') return;
  var t = getFromLocalStorage(this.storageName);
  return t;
};

Storage.prototype.setData = function(checkoutData) {
  if (typeof localStorage === 'undefined') return;
  setToLocalStorage(this.storageName, checkoutData);
  return true;
};

Storage.prototype.setProps = function(props) {
  if (typeof localStorage === 'undefined') return;
  var d = this.getData() || {};
  var newStorage = _.merge(d, props);
  setToLocalStorage(this.storageName, newStorage);
  return newStorage;
};

export default Storage;
