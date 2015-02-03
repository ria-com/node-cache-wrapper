node-cache-wrapper
===================

A simple middleware for [co](https://github.com/tj/co) library. 
Add cache opportunity for you generator or promise 

example
===========

**Add cache cache opportunity for simple generator - testGenerator:**

```javascript
var co = require('co'),
    wait = require('co-wait'),
    cache = require('./');

var testGenerator = function* testGenerator (a) {
    yield wait(1000);
    return a+1;
};

co(function *(){
    var result = yield cache(testGenerator, [4]);
    console.log(result);
}).catch(function(e) {throw e; });
```


simple test
===========

**Make your own spec-file for testing and start test:**

```sh
$ cd node-cache-wrapper
$ npm install
$ npm test
```


roadmap
=======

   * Add redis storage support
