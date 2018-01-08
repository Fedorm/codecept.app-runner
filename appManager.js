const { exec, spawn }         = require('child_process');
const { waitUntilUsedOnHost } = require('tcp-port-used');
const psTree                  = require('ps-tree');

function waitForApp(config, callback) {
  waitUntilUsedOnHost(config.port, config.host, 500, 6000)
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
    this.app.kill();
    psTree(this.app.pid, (err, children) => {
      spawn('kill', ['-9'].concat(this.app.pid, children.map(p => p.PID)));
    })
  }
}

const appManager = new AppManager();

module.exports = appManager;
