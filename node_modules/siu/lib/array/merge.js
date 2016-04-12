var _              = require('lodash');
var isImmutable    = require('../utils/isImmutable');
var wrapAsArray    = require('../utils/wrapAsArray');
var asImmutable    = require('../utils/asImmutable');
var addCIds        = require('./addCIds');

/**
@param  {array} records Records to process
@return {object}        Records processed into a map based on key
*/

function merge(array, recordOrRecords, key) {
  if (!isImmutable(array))           throw new Error('Array must be immutable');
  if (!isImmutable(recordOrRecords)) throw new Error('recordOrRecords must be immutable');
  if (!key)                          throw new Error('Expected key');

  var updatedRecords = wrapAsArray(recordOrRecords);

  // Get a list of records with keys
  var recordsWithKey = _.filter(updatedRecords, function (record) {
    return record[key] != null;
  });

  var recordsWithoutKey = _.filter(updatedRecords, function (record) {
    return record[key] == null;
  });

  var recordsWithKeyMap = _.indexBy(recordsWithKey, key);

  // Merge existing records
  array = array.map(function(existingRecord) {
    if (!existingRecord[key]) throw new Error('Expected exiting record.' + key);

    var existingId = existingRecord[key];

    var record = recordsWithKeyMap[existingId];
    if (record) {
      recordsWithKeyMap = _.omit(recordsWithKeyMap, existingId);
      return record;
    } else {
      return existingRecord;
    }

  });

  // Get a list or records with key not inserted yet
  // We want to preserve the original order
  var recordsWithKeyNotInserted = _.filter(recordsWithKey, function (record) {
    return !!recordsWithKeyMap[record[key]];
  });

  // Insert new records with key
  array = array.concat(recordsWithKeyNotInserted);

  // Add records without keys
  array = array.concat(recordsWithoutKey);

  return array;
}

module.exports = merge;

