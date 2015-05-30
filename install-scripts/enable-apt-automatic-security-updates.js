'use strict';

var SCRIPT_NAME = require('../lib/utils/script-name')(__filename);

var replaceInFile = require('../lib/utils/replace-in-file');
var mustBeRoot = require('../lib/utils/must-be-root');

function enableAptAutomaticSecurityUpdates() {
    return replaceInFile(
        '/etc/apt/apt.conf.d/10periodic',
        [
            'APT::Periodic::Download-Upgradeable-Packages "0"',
            'APT::Periodic::Download-Upgradeable-Packages "1"'
        ],
        [
            'APT::Periodic::Unattended-Upgrade "0"',
            'APT::Periodic::Unattended-Upgrade "1"'
        ]
    ).then(() => SCRIPT_NAME);
}

module.exports = mustBeRoot(enableAptAutomaticSecurityUpdates, SCRIPT_NAME);
