node-cache-wrapper
===================

Wrap co-cacher in to target object with generators


example
=======

```javascript
var wrapper = require('./'),
    co = require('co');

var myObject = {
    first: function* (a,b) {
        return a+b;
    },
    hello: function* (name) {
        return "Hello, " + name;
    }
};

var myCachedObject = wrapper(myObject,180);
co(function *(){
    console.log(yield myCachedObject.hello("Oleg!"));
    console.log(yield myCachedObject.first(7,2));
}).catch(function(e) {throw e; });
```

Warning: Wrapper work only for generator's for koajs or co library
