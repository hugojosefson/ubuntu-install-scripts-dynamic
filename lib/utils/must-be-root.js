'use strict';

var isRoot = require('is-root')();

var rerunAsRoot = require('./rerun-as-root');

function mustBeRoot(fn, scriptName) {
    return isRoot ? fn : rerunAsRoot.bind({}, scriptName);
}

module.exports = mustBeRoot;
