'use strict';

var Promise = require('bluebird');

var fs = require('./promise-fs');
var replaceMultiple = require('./replace-multiple');

function replaceInFile(file, ...regexAndReplacements) {
    return fs.readFileAsync(file, {encoding: 'utf8'}).then(contents => {
        var newContents = replaceMultiple(contents, ...regexAndReplacements);
        if (contents === newContents) {
            return Promise.resolve();
        } else {
            return fs.writeFileAsync(file, newContents);
        }
    });
}

module.exports = replaceInFile;
