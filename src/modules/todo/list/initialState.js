'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const InitialState = Record({
  error: null,
  isFetching: false,
  shouldRefresh:false,
  data:[],
  options:{}
})

export default InitialState