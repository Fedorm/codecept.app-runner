module.exports.config = {
  tests: "./*_test.js",
  timeout: 10000,
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8888"
    }
  },
  plugins: [
    "codecept.app-runner"
  ],
  include: {},
  bootstrap: false,
  mocha: {},
  name: "test"
};
