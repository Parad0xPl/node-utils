const fs = require("fs");
const path = require("path");

/**
 * Dir loader which is loading all modules within it
 * and returning object with filename -> module
 * options :
 *   extensions (default: .js): extension to filter dir`s files
 *   filenameValidator: function (fn) returning boolean if fn should be inclucde
 *     example: (filename) => filename.endsWith("js")
 *   validator: function (module) returning boolean to filter output module
 *     example: (module) => module.someProperty !== undefined
 *     or, (module) => typeof(module) == "function"
 * @param {String} dirname - Dirname
 * @param {Object} options - Options object
 * @param {String} [options.extension=".js"] - Extension
 * @param {Function} [options.filenameValidator] - Filename validator
 * @param {Function} [options.validator] - Module validator
 * @returns {Object} - Loaded modules
 */

module.exports = (dirname = "", options = {}) => {
  let { extension = ".js", filenameValidator, validator } = options;
  let files = fs.readdirSync(dirname);
  let modules = {};
  if (!filenameValidator && extension) {
    filenameValidator = filename => path.extname(filename).endsWith(extension);
  }
  for (file of files) {
    if (filenameValidator && !filenameValidator(file)) {
      continue;
    }
    file = path.resolve(dirname, file);
    let moduleToAdd = require(file);
    if (!validator || validator(moduleToAdd)) {
      modules[
        path.basename(file).slice(0, -path.extname(file).length)
      ] = moduleToAdd;
    }
  }
  return modules;
};
