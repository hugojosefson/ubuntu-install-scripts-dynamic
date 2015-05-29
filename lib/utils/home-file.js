'use strict';

var path = require('path');

module.exports = (filename) => path.resolve(process.env.HOME, filename);
