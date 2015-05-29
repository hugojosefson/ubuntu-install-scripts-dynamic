'use strict';

var _ = require('lodash');

var fs = require('./promise-fs');
var ensureEndsWith = require('./ensure-ends-with');

function ensureLineInFile(file, line) {
    return fs.readFileAsync(file, 'utf8').then(function (contents) {
        if (_.find(contents.split('\n'), function (currentLine) {
                return currentLine === line;
            })) {
            return true;
        } else {
            return fs.appendFileAsync(file, lineWithCorrectNewLines(line));
        }
    });
}

function lineWithCorrectNewLines(line, contents) {
    var lineWithNewLineEnd = ensureEndsWith(line, '\n');
    if (!contents || contents.endsWith('\n')) {
        return lineWithNewLineEnd;
    } else {
        return '\n' + lineWithNewLineEnd;
    }
}

module.exports = ensureLineInFile;
