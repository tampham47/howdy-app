/**
 *
 */

let config = {
  MESSAGE_LIMIT: 24,
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.goingsunny.com/api/v1',
  API_BASE_SSL_URL: process.env.API_BASE_SSL_URL || 'https://api.goingsunny.com/api/v1',
  MQTT_URL: 'ws://goingsunny.com:5551',
  MQTT_SSL_URL: 'wss://goingsunny.com:5552',
};

export default config;
