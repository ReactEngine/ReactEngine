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
    type: ACCESSTOKEN_GET_START
  }
}
export function DeleteSuccess(token) {
  return {
    type: ACCESSTOKEN_GET_SUCCESS,
    payload: token
  }
}
export function DeleteFailure(error) {
  return {
    type: ACCESSTOKEN_GET_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

