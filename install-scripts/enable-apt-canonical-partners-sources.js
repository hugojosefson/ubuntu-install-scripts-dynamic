'use strict';

var SCRIPT_NAME = require('../lib/utils/script-name')(__filename);

var replaceInFile = require('../lib/utils/replace-in-file');
var mustBeRoot = require('../lib/utils/must-be-root');

function enableAptCanonicalPartnersSources() {
    return replaceInFile(
        '/etc/apt/sources.list',
        [
            /# (deb.*?partner)/g,
            '$1'
        ]
    ).then(() => SCRIPT_NAME);
}

module.exports = mustBeRoot(enableAptCanonicalPartnersSources, SCRIPT_NAME);
