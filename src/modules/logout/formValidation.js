/**
 * # formValidation.js
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


/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {
  if (state.form.fields.email !== ''
        &&
        state.form.fields.password !== ''
        &&
        !state.form.fields.emailHasError
        &&
        !state.form.fields.passwordHasError) {
          console.log("logout form is valid")
      return state.setIn(['form','isValid'],true)
    } else {
      return state.setIn(['form','isValid'],false)
    }
}
