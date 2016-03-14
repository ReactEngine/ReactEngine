'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')
/**
 * ## InitialState
 * The form is set 
 */
const Form = Record({
  disabled: false,
  error: null,
  isValid: true,
  isFetching: false,
  fields: new (Record({
  }))
})

/**
 * ## InitialState
 * The form is set 
 */
var InitialState = Record({
  form: new Form
})
export default InitialState

