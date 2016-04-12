module.exports = function extractIds(records) {
	var ids = [];
	for (var a = 0; a < records.length; a++) {
		var record = records[a];
		ids.push(record.id);
	}
	return ids;
}
