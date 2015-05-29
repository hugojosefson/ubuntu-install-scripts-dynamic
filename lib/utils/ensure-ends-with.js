'use strict';

/**
 * Makes sure string ends with ending.
 *
 * @param string whose ending to check
 * @param ending desired ending
 * @returns {String} string with desired ending
 */
function ensureEndsWith(string, ending) {
    if (string.endsWith(ending)) {
        return string;
    } else {
        return string + ending;
    }
}

module.exports = ensureEndsWith;
