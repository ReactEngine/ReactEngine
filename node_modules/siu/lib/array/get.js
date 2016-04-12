module.exports = function get(array, id) {
	for (var a = 0; a < array.length; a++) {
		var record = array[a];
		if (record.id == id) return record;
	}
}
