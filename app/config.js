/**
 *
 */

let config = {
  MESSAGE_LIMIT: 24,
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.goingsunny.com/api/v1',
  API_BASE_SSL_URL: process.env.API_BASE_SSL_URL || 'https://api.goingsunny.com/api/v1',
  RESOURCE_PATH: process.env.API_BASE_SSL_URL || 'https://api.goingsunny.com',
  MQTT_URL: 'ws://broker.goingsunny.com',
  MQTT_SSL_URL: 'wss://broker.goingsunny.com',
};

export default config;
