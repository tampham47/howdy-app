/**
 *
 */

let config = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://api.goingsunny.com/api/v1',
  // API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5600/api/v1',
  MQTT_URL: 'ws://goingsunny.com:5551'
};

export default config;
