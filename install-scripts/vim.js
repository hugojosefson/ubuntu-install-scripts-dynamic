'use strict';


var installAptPackages = require('../lib/install-apt-packages');
var ensureLineInFile = require('../lib/utils/ensure-line-in-file');
var homeFile = require('../lib/utils/home-file');

function vim() {
    return installAptPackages('vim')
        .then(function (result) {
            return ensureLineInFile(homeFile('.bashrc'), 'export EDITOR=vim').then(() => result);
        });
}

module.exports = vim;
