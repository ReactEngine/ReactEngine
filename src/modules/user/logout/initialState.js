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
  isValid: false,
  isFetching: false,
  fields: new (Record({
    email: '',
    emailHasError: false
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

