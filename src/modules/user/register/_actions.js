const {

  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE

} = require('../constants').default
/**
 * ## Signup actions
 */
export function registerStart() {
  return {
    type: USER_REGISTER_START
  }
}
export function registerSuccess(json) {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: json
  }
}
export function registerFailure(error) {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error
  }
}
