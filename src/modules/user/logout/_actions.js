const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_REQUEST_SUCCESS,
  USER_LOGOUT_REQUEST_FAILURE

} = require('../constants').default
/**
 * ## Logout actions
 */
export function requestRequest() {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

export function requestSuccess() {
  return {
    type: USER_LOGOUT_REQUEST_SUCCESS
  }
}

export function requestFailure(error) {
  return {
    type: USER_LOGOUT_REQUEST_FAILURE,
    payload: error
  }
}