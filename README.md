[![CircleCI](https://circleci.com/gh/jploskonka/codecept.app-runner.svg?style=svg)](https://circleci.com/gh/jploskonka/codecept.app-runner)
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

Then invoke `startApp` method provided by plugin inside `bootstrap` hook:

``` js
const { startApp } = require('codecept.app-runner');

module.exports.config = {
  // your usual codecept config

  bootstrap: function(done) {
    startApp({
      host: 'localhost',
      port: 8888,
      appCommand: "node app.js",
      appPath: __dirname
    }, done);
  }
}
```

## API
`startApp` method accepts two parameters, first one is `config` object and
second is `done` callback which is called in order for Codecept to know when
it's time to run tests.

### config
- `host` - host on which Codecept should wait for application \*
- `port` - port on which Codecept should wait for application \*
- `appCommand` - command executed to run application
- `appPath` - absolute path to directory where application should be run

\* `host` and `port` options are used only to wait for URL to start responding
to requests. Those *are not* passed to appCommand in any way. Of course this
needs to match host and port of running application.

## Example
You can see sample configuration [here](./test/codecept.conf.js)

## How it works?
Plugin is slightly improved code from [this
tutorial](http://codenroll.it/post/how-to-run-app-with-codecept-js/) wrapped
into npm package. Check it out if you want to know what's going on inside ;-)

## License
MIT © [jploskonka](http://codenroll.it)
