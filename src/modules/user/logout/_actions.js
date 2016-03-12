const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_REQUEST_SUCCESS,
  USER_LOGOUT_REQUEST_FAILURE

} = require('../constants').default
/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

export function logoutSuccess() {
  return {
    type: USER_LOGOUT_REQUEST_SUCCESS
  }
}

export function logoutFailure(error) {
  return {
    type: USER_LOGOUT_REQUEST_FAILURE,
    payload: error
  }
}