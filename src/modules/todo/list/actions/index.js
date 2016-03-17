const {

  TODO_LIST_REQUEST_START,
  TODO_LIST_REQUEST_SUCCESS,
  TODO_LIST_REQUEST_FAILURE,

  TODO_ITEM_DELETE_START,
  TODO_ITEM_DELETE_SUCCESS,
  TODO_ITEM_DELETE_FAILURE

} = require('../../constants').default

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

export function deleteStart() {
  return {
    type: TODO_ITEM_DELETE_START
  }
}
export function deleteSuccess(json) {
  return {
    type: TODO_ITEM_DELETE_SUCCESS,
    payload: json
  }
}
export function deleteFailure(error) {
  return {
    type: TODO_ITEM_DELETE_FAILURE,
    payload: error
  }
}