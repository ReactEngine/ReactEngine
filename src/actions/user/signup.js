const {

  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE

} = require('../../constants').default
/**
 * ## Signup actions
 */
 signupRequest() {
  return {
    type: USER_SIGNUP_REQUEST
  }
}
 signupSuccess(json) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: json
  }
}
 signupFailure(error) {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: error
  }
}
