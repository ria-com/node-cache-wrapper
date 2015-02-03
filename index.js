/**
 * @module cache-wrapper
 */
(function () {
    "use strict";
    var cacher = require('co-cacher'),
        getAllMethods = function getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    };

    /**
     * Cahe wrapper
     * @param {function} targetObject
     * @param {number} cacheTime
     * @return {object}
     */
    module.exports = function (targetObject, cacheTime) {
        var redefinedMethods=getAllMethods(targetObject);
        var object = {};
        redefinedMethods.forEach(function(method) {
            object[method] = function(){
                var args = [].slice.call(arguments);
                return cacher(targetObject[method], args, { cacheTime: cacheTime, salt: method });
            };
        });

        return object;
    }
}());

