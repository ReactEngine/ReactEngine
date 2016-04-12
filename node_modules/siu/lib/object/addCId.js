var isImmutable    = require('../utils/isImmutable')
var uuid           = require('node-uuid');

module.exports = function addCId(record, prop) {
	if (!record)              throw new Error('addCId: Expected record');
	if (!prop)                throw new Error('addCId: Expected prop');
	if (!isImmutable(record)) throw new Error('addCId: record must be immutable');

	if (record[prop]) {
		return record;
	} else {
		var cid = uuid.v1();
		var merges = {};
		merges[prop] = cid;
		return record.merge(merges);
	}

};
