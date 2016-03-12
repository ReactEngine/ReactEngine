const {

  USER_REGISTER_REQUEST_START,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILURE

} = require('../constants').default
/**
 * ## Signup actions
 */
export function registerStart() {
  return {
    type: USER_REGISTER_REQUEST_START
  }
}
export function registerSuccess(json) {
  return {
    type: USER_REGISTER_REQUEST_SUCCESS,
    payload: json
  }
}
export function registerFailure(error) {
  return {
    type: USER_REGISTER_REQUEST_FAILURE,
    payload: error
  }
}
