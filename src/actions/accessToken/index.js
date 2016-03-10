const {

  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE

} = require('../../constants').default
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

