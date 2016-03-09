/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function login(username,  password) {
  return dispatch => {
    dispatch(loginRequest());
    return APIFactory().login({
      username: username,
      password: password
    })
      .then(function (json) {
	return saveAccessToken(json)
	  .then(function () {
	    dispatch(loginSuccess(json));
	    dispatch(logoutState());
	  });
      })
      .catch((error) => {
	dispatch(loginFailure(error));
      });
  };
}
