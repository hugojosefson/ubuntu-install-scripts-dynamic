'use strict';

module.exports = (scopes) => [
    'gsettings',
    'set',
    'com.canonical.Unity.Lenses',
    'disabled-scopes',
    '\'' + JSON.stringify(scopes) + '\''
].join(' ');
