'use strict';

var SCRIPT_NAME = require('../../lib/utils/script-name')(__filename);

var inPathSync = require('inpath').sync;
var exec = require('faithful-exec');
var Promise = require('bluebird');

var scopes = require('./scopes');
var command = require('./command');

module.exports = () => {
    if (inPathSync('gsettings')) {
        return exec(command(scopes)).then(() => SCRIPT_NAME);
    } else {
        return Promise.resolve(SCRIPT_NAME);
    }
};
