'use strict';

var argv = require('argv');

var pkg = require('./lib/pkg');
var install = require('./lib/install');

argv.info(pkg.description);
argv.version(pkg.version);
argv.option([
    {
        name: 'install',
        short: 'i',
        description: 'Install software package',
        type: 'list,string'
    },
    {
        name: 'install-apt',
        short: 'a',
        description: 'Install Ubuntu package via apt-get',
        type: 'list,string'
    }
]);

var parsed = argv.run();
console.log(parsed.options);

var aptPackages = parsed.options['install-apt'];
if (aptPackages) {
    install(aptPackages).then(function () {
        console.log('Yay! Installed', aptPackages);
    }, function (reason) {
        console.error('Failed to install', aptPackages, reason);
    });
}
