'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const Item = Record({
  error: null,
  isFetching: false
})

var InitialState = Record({
  item:new Item
})

export default InitialState