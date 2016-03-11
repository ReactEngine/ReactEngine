'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')
/**
 * ## InitialState
 * The form is set 
 */
var InitialState = Record({
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false
})
export default InitialState

