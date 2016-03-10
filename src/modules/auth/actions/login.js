const {

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE

} = require('../../../common/constants').default
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
 loginRequest() {
  return {
    type: USER_LOGIN_REQUEST
  }
}

 loginSuccess(json) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: json
  }
}

 loginFailure(error) {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error
  }
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the accessToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
 export default function login(username,  password) {
  return dispatch => {
    dispatch(loginRequest())
    return BackendFactory().login({
      username: username,
      password: password
    })
      .then(function (json) {
  return saveaccessToken(json)
    .then(function () {
      dispatch(loginSuccess(json))
      dispatch(logoutState())
    })
      })
      .catch((error) => {
  dispatch(loginFailure(error))
      })
  }
}
