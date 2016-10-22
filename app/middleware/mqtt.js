/**
 * gsun2016
 * tw
 */

import mqtt from 'mqtt';

var client;
if (typeof window !== 'undefined' && window.location.protocol === 'http:') {
  var client = mqtt.connect('ws://broker.goingsunny.com');
} else {
  var client = mqtt.connect('wss://broker.goingsunny.com');
}

export default client;
