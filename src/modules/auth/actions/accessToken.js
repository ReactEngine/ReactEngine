const {

  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE

} = require('../../../common/constants').default
/**
 * ## accessToken actions
 */
 accessTokenRequest() {
  return {
    type: ACCESSTOKEN_REQUEST
  }
}
 accessTokenRequestSuccess(token) {
  return {
    type: ACCESSTOKEN_SUCCESS,
    payload: token
  }
}
 accessTokenRequestFailure(error) {
  return {
    type: ACCESSTOKEN_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteAccessToken
 */
export default function  deleteAccessToken() {
  return dispatch => {
    dispatch(accessTokenRequest())
    return new  AppAuthToken().deleteAccessToken()
      .then(() => {
        dispatch(accessTokenRequestSuccess())
      })
  }
}
/**
 * ## getAccessToken
 * If AppAuthToken has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export default function  getAccessToken() {
  return dispatch => {
    dispatch(accessTokenRequest())
    return store.getAccessToken()
      .then((token) => {
        if (token) {
          dispatch(logoutState())
          dispatch(accessTokenRequestSuccess(token))
        } else {
          dispatch(accessTokenRequestFailure())
        }
      })
      .catch((error) => {
        dispatch(accessTokenRequestFailure(error))
      })
  }
}

/**
 * ## saveaccessToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with accessToken
 */
export default function  saveaccessToken(json) {
  return store.storeaccessToken(json)
}
