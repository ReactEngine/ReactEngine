/**
 * # authFormValidation.js
 * 
 * This class determines only if the form is valid 
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## Imports
 * the actions being addressed
 */
const {
  STATE_LOGOUT,
  STATE_REGISTER,
  STATE_LOGIN,
  STATE_FORGOT_PASSWORD
} = require('../../../common/constants').default

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {

  switch(state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
  case STATE_LOGOUT:
    return state.setIn(['form','isValid'],true)
    /**
     * ### Registration has 4 fields
     */     
  case STATE_REGISTER:
    if (state.form.fields.username != ''
        &&
        state.form.fields.email !== ''
        &&
        state.form.fields.password !== ''
        &&
        !state.form.fields.usernameHasError
        &&
        !state.form.fields.emailHasError
        &&
        !state.form.fields.passwordHasError) {
      return state.setIn(['form','isValid'],true)
    } else {
      return state.setIn(['form','isValid'],false)
    }
    /**
     * ### Login has 2 fields
     */
  case STATE_LOGIN:
    if (state.form.fields.username !== ''
        &&
        state.form.fields.password !== ''
        &&
        !state.form.fields.usernameHasError
        &&
        !state.form.fields.passwordHasError) {
      return state.setIn(['form','isValid'],true)
    } else {
      return state.setIn(['form','isValid'],false)
    }
    /**
     * ### Reset password has 1 field
     */     
  case STATE_FORGOT_PASSWORD:
    if (state.form.fields.email !== ''
        &&
        !state.form.fields.emailHasError){ 
      return state.setIn(['form','isValid'],true)
    } else {
      return state.setIn(['form','isValid'],false)
    }
    
  }
  /**
   * Default, return the state
   */
  return state
}
