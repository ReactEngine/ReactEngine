var isImmutable    = require('../utils/isImmutable');
var addCId         = require('../object/addCId');

module.exports = function addCIds(records, prop) {
	if (!isImmutable(records)) throw new Error('addCIds: records must be immutable');
	if (!prop)                 throw new Error('addCIds: Expected prop');

	return records.map(function (record) {
		return addCId(record, prop);
	});
};
