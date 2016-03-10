const {

  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE

} = require('../../constants').default
/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: USER_SIGNUP_REQUEST
  }
}
export function signupSuccess(json) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: json
  }
}
export function signupFailure(error) {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: error
  }
}
