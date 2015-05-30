'use strict';

var path = require('path');

function naiiveScriptName(filename) {
    return path.basename(filename, path.extname(filename));
}

function scriptName(filename) {
    var name = naiiveScriptName(filename);
    if (name === 'index') {
        return path.basename(path.dirname(filename));
    } else {
        return name;
    }
}

module.exports = scriptName;
