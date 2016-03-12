const {
  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE,

  ACCESSTOKEN_DELETE_START,
  ACCESSTOKEN_DELETE_SUCCESS,
  ACCESSTOKEN_DELETE_FAILURE
} = require('../../constants').default

/**
 * ## get
 */
export function GetStart() {
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

/**
 * ## delete
 */
export function DeleteStart() {
  return {
    type: ACCESSTOKEN_DELETE_START
  }
}
export function DeleteSuccess(token) {
  return {
    type: ACCESSTOKEN_DELETE_SUCCESS,
    payload: token
  }
}
export function DeleteFailure(error) {
  return {
    type: ACCESSTOKEN_DELETE_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}