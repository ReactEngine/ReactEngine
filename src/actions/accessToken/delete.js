const {

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,
  DELETE_TOKEN_FAILURE
} = require('../../constants').default
/**
 * ## accessToken actions
 */
export function DeleteRequest() {
  return {
    type: ACCESSTOKEN_REQUEST
  }
}
export function DeleteSuccess(token) {
  return {
    type: ACCESSTOKEN_SUCCESS,
    payload: token
  }
}
export function DeleteFailure(error) {
  return {
    type: ACCESSTOKEN_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

