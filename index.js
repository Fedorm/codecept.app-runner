const appManager = require('./appManager');
const { event }  = require('codeceptjs');

module.exports.startApp = function(config, done) {
  event.dispatcher.on(event.all.result, function() {
    appManager.close();
  })

  appManager.start(config, done);
}
