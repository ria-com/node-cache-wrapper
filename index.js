/**
 * @module cache-wrapper
 */
(function () {
    "use strict";
    var config = require('config'),
        qMemcached = require('memcache-promise'),
        memcached = new qMemcached(
            config.memcached.servers,
            config.memcached.options
        );

    /**
     * Cahe wrapper
     *
     * @param {(function|generator|promise)} myGenerator
     * @param {Array} args
     * @param {number} cacheTime
     * @return {*}
     *
     * @example
     * var co = require('co'),
     *     wait = require('co-wait'),
     *     cache = require('./');
     *
     * var testGenerator = function* testGenerator (a) {
     *     yield wait(1000);
     *     return a+1;
     * };
     *
     * co(function *(){
     *     var result = yield cache(testGenerator, [4]);
     *     console.log(result);
     * }).catch(function(e) {throw e; });
     *
     */
    module.exports = function* (myGenerator, args, cacheTime) {
        var key = 'prefix_' +args.join('_');
        var value = yield memcached.get(key);
        var time = cacheTime || config.cache.defaultTime;
        if (value) {
            return value;
        }
        var data = yield myGenerator.apply(null,args);
        memcached.set(key,data,time).done();
        return data;
    }
}());
