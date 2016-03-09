/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call Maxleap.signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(username, email, password) {
  return dispatch => {
    dispatch(signupRequest());
    return  APIFactory().signup({
      username: username,
      email: email,
      password: password
    })
      .then(function (json) {
	return saveAccessToken(json)
	  .then(function () {
	    dispatch(signupSuccess(
	      Object.assign({},
			    {
			      username: username,
			      email: email,
			      objectId: json.objectId,
			      createdAt: json.createdAt,
			      sessionToken: json.sessionToken
			    }
			   )
	    ));
	    dispatch(logoutState());
	  });
      })
      .catch((error) => {
	dispatch(signupFailure(error));
      });
  };
}


/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}
export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json
  };
}
export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  };
}
