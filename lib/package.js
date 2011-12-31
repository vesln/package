/**
 * package - Easy package.json exports.
 * 
 * Author: Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License.
 */

/**
 * Dependencies.
 */
var fs = require('fs');
var path = require('path');

/**
 * Package.
 * 
 * @param {String|null} location
 * @returns {Object} package.json data
 */
var package = function(location) {
  if (arguments.length === 0) {
    location = package.discover();
  }
  return package.read(path.normalize(location + '/package.json'));
};

/**
 * Reads and parses a package.json file.
 * 
 * @param {String} file
 * @returns {Object} package.json data
 */
package.read = function(file) {
  var data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
};

/**
 * Makes an atempt to find package.json file.
 * 
 * @returns {Object} package.json data
 */
package.discover = function() {
  var location = path.dirname(module.parent.filename);
  var found = null;
  
  while (!found) {
    if (path.existsSync(location + '/package.json')) {
      found = location;
    } else if (location !== '/') {
      location = path.dirname(location);
    } else {
      throw new Error('package.json can not be located');
    }
  }
  
  return found;
};

/**
 * Exporting the lib.
 */
module.exports = package;