const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE

} = require('../../../common/constants').default
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

export default function logout() {
 return dispatch => {
   dispatch(logoutRequest())
   return store.getAccessToken()
     .then((token) => {
       return APIFactory(token).logout()
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
