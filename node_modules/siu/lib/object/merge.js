var isImmutable = require('../utils/isImmutable')

module.exports = function merge(object, merges) {
	if (!isImmutable(object)) throw new Error('object must be immutable');
	if (!merges) throw new Error('expected merges');

	return object.merge(merges);
}
