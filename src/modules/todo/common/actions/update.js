const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_UPDATE_REQUEST_START,
  TODO_UPDATE_REQUEST_SUCCESS,
  TODO_UPDATE_REQUEST_FAILURE,

} = require('../constants').default


//update
export function updateRequestStart() {
  return {
    type: TODO_UPDATE_REQUEST_START
  }
}
export function updateRequestSuccess(json) {
  return {
    type: TODO_UPDATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateRequestFailure(error) {
  return {
    type: TODO_UPDATE_REQUEST_FAILURE,
    payload: error
  }
}