const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_GETCHANGESTREAM_REQUEST_START,
  TODO_GETCHANGESTREAM_REQUEST_SUCCESS,
  TODO_GETCHANGESTREAM_REQUEST_FAILURE,

} = require('../constants').default

//getChangeStream
export function getChangeStreamRequestStart() {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_START
  }
}
export function getChangeStreamRequestSuccess(json) {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function getChangeStreamRequestFailure(error) {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}