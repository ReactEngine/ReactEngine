const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_FINDBYID_REQUEST_START,
  TODO_FINDBYID_REQUEST_SUCCESS,
  TODO_FINDBYID_REQUEST_FAILURE,

} = require('../constants').default


//findById
export function findByIdRequestStart() {
  return {
    type: TODO_FINDBYID_REQUEST_START
  }
}

export function findByIdRequestSuccess(json) {
  return {
    type: TODO_FINDBYID_REQUEST_SUCCESS,
    payload: json
  }
}

export function findByIdRequestFailure(error) {
  return {
    type: TODO_FINDBYID_REQUEST_FAILURE,
    payload: error
  }
}