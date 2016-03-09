/**
 * ## Logout actions
 */
export logoutRequest() {
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

logout() {
 return dispatch => {
   dispatch(logoutRequest())
   return store.getAccessToken()
     .then((token) => {
       return BackendFactory(token).logout()
     })
     .then(() => {
       dispatch(registerState())
       dispatch(logoutSuccess())
       dispatch(deleteAccessToken())
     })
     .catch((error) => {
       dispatch(loginState())
       dispatch(logoutSuccess())
       dispatch(logoutFailure(error))
     })
 }

}
