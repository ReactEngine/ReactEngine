var isArray = require('./isArray');
var SI      = require('seamless-immutable');

module.exports = function wrapAsArray(recordOrRecords) {
	return isArray(recordOrRecords) ? recordOrRecords : SI([recordOrRecords]);
};
