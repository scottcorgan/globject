var match = require('minimatch');

var globject = function (obj) {
  return function (val) {
    var key = Object.keys(obj).filter(function (key) {
      return match(val, key);
    })[0];
    
    return (key) ? obj[key] : undefined;
  };
};

module.exports = globject;