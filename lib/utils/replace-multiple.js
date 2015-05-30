'use strict';

function replaceMultiple(string, ...regexAndReplacements) {
    return regexAndReplacements.reduce(
        (soFar, [regex, replacement]) => soFar.replace(regex, replacement),
        string
    );
}

module.exports = replaceMultiple;
