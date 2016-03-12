const {

  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE

} = require('../constants').default
/**
 * ## Signup actions
 */
export function registerStart() {
  return {
    type: REGISTER_START
  }
}
export function registerSuccess(json) {
  return {
    type: REGISTER_SUCCESS,
    payload: json
  }
}
export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    payload: error
  }
}
