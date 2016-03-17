const {

  TODO_LIST_REQUEST_START,
  TODO_LIST_REQUEST_SUCCESS,
  TODO_LIST_REQUEST_FAILURE

} = require('../../constants').default
/**
 * ## Signup actions
 */
export function requestStart() {
  return {
    type: TODO_LIST_REQUEST_START
  }
}
export function requestSuccess(json) {
  return {
    type: TODO_LIST_REQUEST_SUCCESS,
    payload: json
  }
}
export function requestFailure(error) {
  return {
    type: TODO_LIST_REQUEST_FAILURE,
    payload: error
  }
}
