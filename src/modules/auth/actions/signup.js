/**
 * ## Signup actions
 */
 signupRequest() {
  return {
    type: USER_SIGNUP_REQUEST
  }
}
 signupSuccess(json) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: json
  }
}
 signupFailure(error) {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: error
  }
}

/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call Parse.signup and if good, save the accessToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
 signup(username, email, password) {
  return dispatch => {
    dispatch(signupRequest())
    return  APIFactory().signup({
      username: username,
      email: email,
      password: password
    })
      .then(function (json) {
  return saveaccessToken(json)
    .then(function () {
      dispatch(signupSuccess(
        Object.assign({},
          {
            username: username,
            email: email,
            objectId: json.objectId,
            createdAt: json.createdAt,
            accessToken: json.accessToken
          }
         )
      ))
      dispatch(logoutState())
    })
      })
      .catch((error) => {
  dispatch(signupFailure(error))
      })
  }
}
