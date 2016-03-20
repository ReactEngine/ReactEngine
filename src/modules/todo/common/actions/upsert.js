const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_UPSERT_REQUEST_START,
  TODO_UPSERT_REQUEST_SUCCESS,
  TODO_UPSERT_REQUEST_FAILURE,

} = require('../constants').default

//upsert
export function upsertRequestStart() {
  return {
    type: TODO_UPSERT_REQUEST_START
  }
}
export function upsertRequestSuccess(json) {
  return {
    type: TODO_UPSERT_REQUEST_SUCCESS,
    payload: json
  }
}

export function upsertRequestFailure(error) {
  return {
    type: TODO_UPSERT_REQUEST_FAILURE,
    payload: error
  }
}