const {

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE

} = require('../constants').default
/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}