const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE

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
    type: USER_LOGOUT_SUCCESS
  }
}

export function logoutFailure(error) {
  return {
    type: USER_LOGOUT_FAILURE,
    payload: error
  }
}