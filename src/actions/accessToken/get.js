const {

  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE
} = require('../../constants').default
/**
 * ## accessToken actions
 */
export function GetRequest() {
  return {
    type: ACCESSTOKEN_REQUEST
  }
}
export function GetSuccess(token) {
  return {
    type: ACCESSTOKEN_SUCCESS,
    payload: token
  }
}
export function GetFailure(error) {
  return {
    type: ACCESSTOKEN_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

