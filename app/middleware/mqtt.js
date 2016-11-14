/**
 * gsun2016
 * tw
 */

import mqtt from 'mqtt';

// var client = mqtt.connect('wss://broker.goingsunny.com');
var client = mqtt.connect('ws://localhost:5551');

export default client;
