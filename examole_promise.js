var wrapper = require('./'),
    Q = require('q');

var myObject = {
    first: function (a,b) {
        var deferred = Q.defer();
        deferred.resolve(a+b);
        return deferred.promise;
    },
    hello: function (name) {
        return Q.delay("Hello, " + name, 1000);
    }
};

var myWrappedObject = wrapper(myObject,180,{cacherType: 'promise'});
myWrappedObject.first(7,2).done(function(value){
    console.log(value);
});

//myCachedObject.fake(1);
