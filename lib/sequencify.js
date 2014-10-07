'use strict';

var Promise = require('es6-promise').Promise;

var inProgress = Promise.resolve();

function sequencify(fn) {
    return function () {
        var args = arguments;
        function goAhead() {
            inProgress = fn.apply({}, args);
            return inProgress;
        }
        return inProgress.then(goAhead, goAhead);
    };
}

module.exports = sequencify;
