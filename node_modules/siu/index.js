module.exports = {
  isImmutable: require('./lib/utils/isImmutable'),
  asImmutable: require('./lib/utils/asImmutable'),
  o: {
    addCId:       require('./lib/object/addCId'),
    merge:        require('./lib/object/merge'),
  },
  a: {
    addCIds:      require('./lib/array/addCIds'),
    merge:        require('./lib/array/merge'),
    filter:       require('./lib/array/filter'),
    find:         require('./lib/array/find'),
    get:          require('./lib/array/get'),
    reject:       require('./lib/array/reject'),
  }
}
