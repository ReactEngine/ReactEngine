const {

  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE

} = require('../constants').default
/**
  * ## Login
  * After dispatching the logoutRequest, get the accessToken
  * and call Parse
  *
  * When the response from Parse is received and it's valid
  * change the state to register and finish the logout
  *
  * But if the call to Parse fails, like expired token or
  * no network connection, just send the failure
  *
  * And if you fail due to an invalid accessToken, be sure
  * to delete it so the user can log in.
  *
  * How could there be an invalid accessToken?  Maybe they
  * haven't used the app for a long time.  Or they used another
  * device and logged out there.
  */
/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_START
  }
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}
