/**
 * gsun2016
 * tw
 */

import mqtt from 'mqtt';

var client;
if (typeof window !== 'undefined' && window.location.protocol === 'http:') {
  var client = mqtt.connect('ws://goingsunny.com:5551');
} else {
  // var client = mqtt.connect('wss://goingsunny.com:5550');
}

export default client;
