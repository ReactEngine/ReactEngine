const {

  USER_REGISTER_REQUEST_START,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILURE

} = require('../constants').default
/**
 * ## Signup actions
 */
export function requestStart() {
  return {
    type: USER_REGISTER_REQUEST_START
  }
}
export function requestSuccess(json) {
  return {
    type: USER_REGISTER_REQUEST_SUCCESS,
    payload: json
  }
}
export function requestFailure(error) {
  return {
    type: USER_REGISTER_REQUEST_FAILURE,
    payload: error
  }
}
