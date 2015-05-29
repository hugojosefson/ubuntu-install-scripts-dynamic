#!./node_modules/.bin/babel-node
'use strict';

var argv = require('minimist')(process.argv.slice(2));

var install = require('./lib/install');

var names = argv._;
if (names.length) {
    install(names).then(function () {
        console.log('Yay! Installed', names);
    }, function (result) {
        console.error('Failed to install', result);
    });
} else {
    console.log('Usage: ' + process.argv[1] + ' <package-or-script>...');
}
