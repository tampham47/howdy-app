/**
 *
 */

import debug from 'debug';

var log = debug('gsun');
var DebugMidd = function() {};

DebugMidd.prototype.log = function() {
  console.log(arguments);
};

export default new DebugMidd();
