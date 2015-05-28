'use strict';

var Promise = require('bluebird');
var debounce = require('debounce');

var defer = require('./defer');
var apt = require('./apt');

var waiting = [];
var installed = {};

var currentBatch;
var installPending = debounce(function () {
    if (currentBatch) {
        currentBatch.then(installPending);
    } else {
        if (waiting.length) {
            currentBatch = new Promise(function (resolve, reject) {
                var aptPromise = apt.install(waiting);
                waiting.forEach(function (name) {
                    aptPromise.then(installed[name].resolve, installed[name].reject);
                });
                aptPromise.then(resolve, reject);
                waiting = [];
            });

            currentBatch.then(function () {
                currentBatch = null;
                installPending();
            });
        }
    }
}, 0);

function install(name) {
    if (Array.isArray(name)) {
        var names = name;
        return Promise.all(names.map(install));
    } else {
        console.log('install', name);
        if (!installed[name]) {
            installed[name] = defer();
            waiting.push(name);
        }
        installPending();
        return installed[name].promise;
    }
}

module.exports = install;
