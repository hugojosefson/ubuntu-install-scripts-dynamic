'use strict';

var sudo = require('sudo');

var promisifyAptFunction = require('../apt/promisify-apt-function');

function promiseSudo(args, sudoOptions) {
    return promisifyAptFunction(function () {
        return sudo(['--preserve-env'].concat(args), sudoOptions);
    })();
}

module.exports = promiseSudo;
