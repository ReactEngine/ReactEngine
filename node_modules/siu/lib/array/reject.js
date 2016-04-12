var _    = require('lodash');
var SI   = require('seamless-immutable');

module.exports = function reject(records, func) {
	if (!_.isArray(records)) throw new Error('reject: Expected records to be an array');
	return SI(_.reject(records, func));
}
