const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  TODO_CREATECHANGESTREAM_REQUEST_START,
  TODO_CREATECHANGESTREAM_REQUEST_SUCCESS,
  TODO_CREATECHANGESTREAM_REQUEST_FAILURE,

} = require('../constants').default

//createChangeStream
export function createChangeStreamRequestStart() {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_START
  }
}
export function createChangeStreamRequestSuccess(json) {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function createChangeStreamRequestFailure(error) {
  return {
    type: TODO_GETCHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}