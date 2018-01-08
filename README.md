# codeceptjs.app-runner
[CodeceptJS](http://codecept.io/) plugin to automatically run your application
before tests.

## Usage
Install package:

``` sh
$ yarn add --dev codecept.app-runner
# or with npm:
$ npm install --save-dev codecept.app-runner
```

Package provides two methods: `startApp` and `closeApp` which you need to invoke
in `bootstrap` and `teardown` hooks respectively. In `codecept.conf.js`:

``` js
const { startApp, closeApp } = require('codecept.app-runner');

module.exports.config = {
  // your usual codecept config

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
}
```

*IMPORTANT!*
To use this package you have to use `js` version of Codecept's configuration
file, it won't work with `.json` one. Check out
[docs](http://codecept.io/configuration/#dynamic-configuration).

## Example
You can see sample configuration [here](./test/codecept.conf.js)

## How it works?
Plugin is basically code from [this
tutorial](http://codenroll.it/post/how-to-run-app-with-codecept-js/) wrapped
into npm package. Check it out if you want to know what's going on inside.

## License
MIT © [jploskonka](http://codenroll.it)
