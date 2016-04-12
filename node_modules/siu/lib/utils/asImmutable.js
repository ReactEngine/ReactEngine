var SI            = require('seamless-immutable');
var isImmutable   = require('./isImmutable');

module.exports = function asImm(object) {
	if (isImmutable(object)) return object;
	return SI(object);
};
