const {

  TODO_LIST_GET_START,
  TODO_LIST_GET_SUCCESS,
  TODO_LIST_GET_FAILURE,

  TODO_ITEM_DELETE_START,
  TODO_ITEM_DELETE_SUCCESS,
  TODO_ITEM_DELETE_FAILURE

} = require('../../constants').default

export function getStart() {
  return {
    type: TODO_LIST_GET_START
  }
}
export function getSuccess(json) {
  return {
    type: TODO_LIST_GET_SUCCESS,
    payload: json
  }
}
export function getFailure(error) {
  return {
    type: TODO_LIST_GET_FAILURE,
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