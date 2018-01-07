const appManager = require('./appManager');

module.exports.startApp = function(config, done) {
  appManager.start(config, done);
}

module.exports.closeApp = function(done) {
  appManager.close(done);
}
