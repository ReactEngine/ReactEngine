'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const InitialState = Record({
  error: null,
  isFetching: false,
  data:[],
  options:{}
})

export default InitialState