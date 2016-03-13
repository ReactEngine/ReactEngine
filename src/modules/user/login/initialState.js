'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')
/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    email: 'User02@gmail.com',
    emailHasError: false,
    password: 'User@02',
    passwordHasError: false,
    showPassword: false
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

