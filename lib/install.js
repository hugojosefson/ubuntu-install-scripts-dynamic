'use strict';

var installScripts = require('../install-scripts');

var installAptPackages = require('./install-apt-packages');

/**
 * Installs one or several apt packages or software packages, returning a
 * promise for when they have been installed.
 *
 * @param name String with name of a package to install, or Array of them.
 *
 * @returns {Promise} Promise for array of result objects, or rejected with single result object.
 */
function install(name) {
    if (Array.isArray(name)) {
        var names = name;
        return Promise.all(names.map(install));
    } else {
        var [scriptName, subFunctionName, ...extraArgs] = name.split(':');
        var script = installScripts[scriptName];
        if (script) {
            if (subFunctionName) {
                return script[subFunctionName](extraArgs);
            } else {
                console.log('Installing script', scriptName);
                return script();
            }
        } else {
            return installAptPackages(name);
        }
    }
}

module.exports = install;
