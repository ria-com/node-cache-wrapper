/**
 * @module cache-wrapper
 */
(function () {
    "use strict";
    var getAllMethods = function getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    };

    var cacherTypes = {
        'generator': 0,
        'promise': 1
    };

    var detectCacherType = function detectCacherType(cacherType) {
        return Number(cacherTypes[cacherType]);
    };

    var cachers = [require('co-cacher'),require('cacher-promise')];

    /**
     * Cahe wrapper
     * @param {function} targetObject
     * @param {number} cacheTime
     * @param {object} options now support 'cacherType' option ('generator' or 'promise'). By default = 'generator'
     * @return {object}
     */
    module.exports = function (targetObject, cacheTime, options) {
        var cacherIdx = 0;
        if (typeof options == "object") {
            cacherIdx = detectCacherType(options.cacherType);
        }
        var redefinedMethods=getAllMethods(targetObject);
        var object = {};
        redefinedMethods.forEach(function(method) {
            object[method] = function(){
                var args = [].slice.call(arguments);
                return cachers[cacherIdx](targetObject[method], args, { cacheTime: cacheTime, salt: method });
            };
        });

        return object;
    }
}());

