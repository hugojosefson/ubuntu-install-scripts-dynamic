'use strict';

var Promise = require('bluebird');

var inProgress = Promise.resolve();

/**
 * Wraps promise returning function, so any calls to it are performed in sequence.
 * @param fn promise returning function
 * @returns {Function} FIFO'ed promise returning function
 */
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
