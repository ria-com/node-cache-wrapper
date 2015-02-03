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
