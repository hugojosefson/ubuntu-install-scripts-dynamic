/**
 * Makes sure string ends with ending.
 *
 * @param string whose ending to check
 * @param ending desired ending
 * @returns {String} string with desired ending
 */
export default (string, ending) =>
  string.endsWith(ending) ? `${string}` : `${string}${ending}`
