const { startApp, closeApp } = require('codecept.app-runner');

module.exports.config = {
  tests: "./*_test.js",
  timeout: 10000,
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8888",
    }
  },
  include: {},
  bootstrap: function(done) {
    startApp({
      host: 'localhost',
      port: 8888,
      appCommand: "node app.js",
      appPath: __dirname
    }, done);
  },
  teardown: function(done) {
    closeApp(done);
  },
  mocha: {},
  name: "test",
};
