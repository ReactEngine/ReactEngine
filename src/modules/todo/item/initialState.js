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
  item:Item
})

export default InitialState