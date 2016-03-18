'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const List = Record({
  error: null,
  isFetching: false
})

var InitialState = Record({
  list:new List
})

export default InitialState