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
  isValid: true,
  isFetching: false,
  fields: new (Record({
    username: 'User11',
    usernameHasError: false,
    email: 'User11@gmail.com',
    emailHasError: false,
    password: 'User@11',
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

