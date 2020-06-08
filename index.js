const { exec, spawn }         = require('child_process');
const { waitUntilUsedOnHost } = require('tcp-port-used');
const psTree                  = require('ps-tree');
const { event }               = require('codeceptjs');

function waitForApp(config, callback) {
  waitUntilUsedOnHost(config.port, config.host, 500, 60000)
    .then(() => {
      console.log('Application started, running tests.');
      callback();
    }, err => console.log(err));
}

class AppManager {
  constructor() {
    this.app = null;
  }

  start(config, callback) {
    console.log(`Starting app at: ${config.host}:${config.port}`);

    this.app = exec(config.appCommand, { cwd: config.appPath }, (err, stdout, stderr) => {
      stderr && console.log(stderr)
    });
    waitForApp(config, callback);
  }

  close() {
    psTree(this.app.pid, (err, children) => {
      spawn('kill', ['-9'].concat(this.app.pid, children.map(p => p.PID)));
    })
  }
}

const appManager = new AppManager();

module.exports.startApp = function(config, done) {
  event.dispatcher.on(event.all.result, function() {
    appManager.close();
  })

  appManager.start(config, done);
}
