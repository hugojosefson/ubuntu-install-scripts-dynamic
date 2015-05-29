#!./node_modules/.bin/babel-node
'use strict';

var argv = require('argv');

var pkg = require('./lib/utils/pkg');
var install = require('./lib/install');

argv.info(pkg.description);
argv.version(pkg.version);
argv.option([
    {
        name: 'install',
        description: 'Install software packages or Ubuntu packages',
        type: 'list,string'
    }
]);

var parsed = argv.run();
console.log(parsed.options);

var names = parsed.options['install'];
if (names) {
    install(names).then(function (result) {
        console.log('Yay! Installed', result);
    }, function (result) {
        console.error('Failed to install', result);
    });
}
