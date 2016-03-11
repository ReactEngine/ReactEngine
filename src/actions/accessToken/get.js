const {

  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE
} = require('../../constants').default
/**
 * ## accessToken actions
 */
export function GetRequest() {
  return {
    type: ACCESSTOKEN_GET_START
  }
}
export function GetSuccess(token) {
  return {
    type: ACCESSTOKEN_GET_SUCCESS,
    payload: token
  }
}
export function GetFailure(error) {
  return {
    type: ACCESSTOKEN_GET_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

