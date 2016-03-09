/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  };
}
/**
 * ## Login
 * After dispatching the logoutRequest, get the accessToken
 * and call Maxleap
 *
 * When the response from Maxleap is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call to Maxleap fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid accessToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid accessToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return new AppAuthToken().getAccessToken()
      .then((token) => {
        return APIFactory(token).logout();
      })
      .then(() => {
        dispatch(registerState());
        dispatch(logoutSuccess());
        dispatch(deleteAccessToken());
      })
      .catch((error) => {
        dispatch(loginState());
        dispatch(logoutSuccess());
        dispatch(logoutFailure(error));
      });
  };

}
