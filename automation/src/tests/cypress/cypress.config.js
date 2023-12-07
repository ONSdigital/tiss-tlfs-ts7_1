const { defineConfig } = require('cypress');

module.exports = defineConfig({
  "projectId": "yw2h6e",
  "video": true,
  "videoUploadOnPasses": false,
  "experimentalStudio": true,
  "viewportWidth": 1920,
  "scrollBehavior": "center",
  "viewportHeight": 1080,
  "defaultCommandTimeout": 10000,
  "redirectionLimit": 500,
  "numTestsKeptInMemory": 1,
  "retries": {
    "runMode": 1,
    "openMode": 0
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.

    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    "specPattern": "cypress/e2e/**/*.{js,jsx,ts,tsx}"
  }
});