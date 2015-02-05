node-cache-wrapper
===================

Wrap co-cacher in to target object with generators


example
=======

Generators wrapper:
```javascript
var wrapper = require('./'),
    co = require('co');

var myObject = {
    sum: function* (a,b) {
        return a+b;
    },
    hello: function* (name) {
        return "Hello, " + name;
    }
};

var myCachedObject = wrapper(myObject,180); // Cache all methods on 3 min
co(function *(){
    console.log(yield myCachedObject.hello("Oleg!"));
    console.log(yield myCachedObject.sum(7,2));
}).catch(function(e) {throw e; });
```
Warning: Wrapper work only for generator's for koajs or co library


Promises wrapper:
```javascript
var wrapper = require('./'),
    Q = require('q');

var myObject = {
    sum: function (a,b) {
        var deferred = Q.defer();
        deferred.resolve(a+b);
        return deferred.promise;
    },
    hello: function (name) {
        return Q.delay("Hello, " + name, 1000);
    }
};

var myWrappedObject = wrapper(myObject,180,{cacherType: 'promise'}); // Cache all methods on 3 min
myWrappedObject.sum(7,2).done(function(value){
    console.log(value);
    myWrappedObject.hello("Oleg!").done(function(value){
        console.log(value);
    });
});
```

