const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_COUNT_REQUEST_START,
  TODO_COUNT_REQUEST_SUCCESS,
  TODO_COUNT_REQUEST_FAILURE,

} = require('../constants').default


//count
export function countRequestStart() {
  return {
    type: TODO_COUNT_REQUEST_START
  }
}

export function countRequestSuccess(json) {
  return {
    type: TODO_COUNT_REQUEST_SUCCESS,
    payload: json
  }
}

export function countRequestFailure(error) {
  return {
    type: TODO_COUNT_REQUEST_FAILURE,
    payload: error
  }
}