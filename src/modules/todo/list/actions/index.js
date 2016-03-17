const {
  TODO_LIST_FIND_REQUEST_START,
  TODO_LIST_FIND_REQUEST_SUCCESS,
  TODO_LIST_FIND_REQUEST_FAILURE,

  TODO_LIST_CREATE_REQUEST_START,
  TODO_LIST_CREATE_REQUEST_SUCCESS,
  TODO_LIST_CREATE_REQUEST_FAILURE,

  TODO_LIST_COUNT_REQUEST_START,
  TODO_LIST_COUNT_REQUEST_SUCCESS,
  TODO_LIST_COUNT_REQUEST_FAILURE,

  TODO_LIST_UPDATE_REQUEST_START,
  TODO_LIST_UPDATE_REQUEST_SUCCESS,
  TODO_LIST_UPDATE_REQUEST_FAILURE,

  TODO_LIST_GETCHANGESTREAM_REQUEST_START,
  TODO_LIST_GETCHANGESTREAM_REQUEST_SUCCESS,
  TODO_LIST_GETCHANGESTREAM_REQUEST_FAILURE,

  TODO_LIST_CREATECHANGESTREAM_REQUEST_START,
  TODO_LIST_CREATECHANGESTREAM_REQUEST_SUCCESS,
  TODO_LIST_CREATECHANGESTREAM_REQUEST_FAILURE,

  TODO_LIST_UPSERT_REQUEST_START,
  TODO_LIST_UPSERT_REQUEST_SUCCESS,
  TODO_LIST_UPSERT_REQUEST_FAILURE,

} = require('../../constants').default

//find
export function findRequestStart() {
  return {
    type: TODO_LIST_FIND_REQUEST_START
  }
}

export function findRequestSuccess(json) {
  return {
    type: TODO_LIST_FIND_REQUEST_SUCCESS,
    payload: json
  }
}

export function findRequestFailure(error) {
  return {
    type: TODO_LIST_FIND_REQUEST_FAILURE,
    payload: error
  }
}

//create
export function createRequestStart() {
  return {
    type: TODO_LIST_CREATE_REQUEST_START
  }
}

export function createRequestSuccess(json) {
  return {
    type: TODO_LIST_CREATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function createRequestFailure(error) {
  return {
    type: TODO_LIST_CREATE_REQUEST_FAILURE,
    payload: error
  }
}

//count
export function countRequestStart() {
  return {
    type: TODO_LIST_COUNT_REQUEST_START
  }
}

export function countRequestSuccess(json) {
  return {
    type: TODO_LIST_COUNT_REQUEST_SUCCESS,
    payload: json
  }
}

export function countRequestFailure(error) {
  return {
    type: TODO_LIST_COUNT_REQUEST_FAILURE,
    payload: error
  }
}

//update
export function updateRequestStart() {
  return {
    type: TODO_LIST_UPDATE_REQUEST_START
  }
}
export function updateRequestSuccess(json) {
  return {
    type: TODO_LIST_UPDATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateRequestFailure(error) {
  return {
    type: TODO_LIST_UPDATE_REQUEST_FAILURE,
    payload: error
  }
}

//createChangeStream
export function createChangeStreamRequestStart() {
  return {
    type: TODO_LIST_GETCHANGESTREAM_REQUEST_START
  }
}
export function createChangeStreamRequestSuccess(json) {
  return {
    type: TODO_LIST_GETCHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function createChangeStreamRequestFailure(error) {
  return {
    type: TODO_LIST_GETCHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}


//createChangeStream
export function createChangeStreamRequestStart() {
  return {
    type: TODO_LIST_CREATECHANGESTREAM_REQUEST_START
  }
}
export function createChangeStreamRequestSuccess(json) {
  return {
    type: TODO_LIST_CREATECHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function createChangeStreamRequestFailure(error) {
  return {
    type: TODO_LIST_CREATECHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}


//upsert
export function upsertRequestStart() {
  return {
    type: TODO_LIST_UPSERT_REQUEST_START
  }
}
export function upsertRequestSuccess(json) {
  return {
    type: TODO_LIST_UPSERT_REQUEST_SUCCESS,
    payload: json
  }
}

export function upsertRequestFailure(error) {
  return {
    type: TODO_LIST_UPSERT_REQUEST_FAILURE,
    payload: error
  }
}
