'use strict';

var sudoOptions = require('../apt/sudo-options');

var promiseSudo = require('./promise-sudo');

function rerunAsRoot(scriptName) {
    return promiseSudo(
        [
            './find-node-or-install/node',
            'node_modules/.bin/babel-node',
            './index.js',
            scriptName
        ],
        sudoOptions
    ).then(() => scriptName);
}

module.exports = rerunAsRoot;
