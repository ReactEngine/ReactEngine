var SI = require('seamless-immutable');

module.exports = function(object) {
	return SI.isImmutable(object);
}
