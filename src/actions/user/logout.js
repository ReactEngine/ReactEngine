const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE

} = require('../../constants').default
/**
 * ## Logout actions
 */
logoutRequest() {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

 logoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS
  }
}

 logoutFailure(error) {
  return {
    type: USER_LOGOUT_FAILURE,
    payload: error
  }
}