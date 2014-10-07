'use strict';

/**
 * Exposes contents of package.json on module.exports, which means this module can be required and used as a
 * representation of the current project's package.json:
 *
 * <pre>
 * var pkg = require('./utils/pkg');
 * console.log(pkg.devDependencies); // prints out this project's devDependencies
 * </pre>
 */
require('pkginfo')(module);
