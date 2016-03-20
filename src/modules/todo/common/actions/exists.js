const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_EXISTS_REQUEST_START,
  TODO_EXISTS_REQUEST_SUCCESS,
  TODO_EXISTS_REQUEST_FAILURE,

} = require('../constants').default

//exists
export function existsRequestStart() {
  return {
    type: TODO_EXISTS_REQUEST_START
  }
}

export function existsRequestSuccess(json) {
  return {
    type: TODO_EXISTS_REQUEST_SUCCESS,
    payload: json
  }
}

export function existsRequestFailure(error) {
  return {
    type: TODO_EXISTS_REQUEST_FAILURE,
    payload: error
  }
}