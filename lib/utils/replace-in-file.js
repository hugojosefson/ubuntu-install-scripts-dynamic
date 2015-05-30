'use strict';

var Promise = require('bluebird');

var fs = require('./promise-fs');

function replaceInFile(file, regex, replacement) {
    return fs.readFileAsync(file, {encoding: 'utf8'}).then(contents => {
        var newContents = contents.replace(regex, replacement);
        if (contents === newContents) {
            return Promise.resolve();
        } else {
            return fs.writeFileAsync(file, newContents);
        }
    });
}

module.exports = replaceInFile;
