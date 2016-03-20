const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  TODO_FINDONE_REQUEST_START,
  TODO_FINDONE_REQUEST_SUCCESS,
  TODO_FINDONE_REQUEST_FAILURE,

} = require('../constants').default


//findOne
export function findOneRequestStart() {
  return {
    type: TODO_FINDONE_REQUEST_START
  }
}

export function findOneRequestSuccess(json) {
  return {
    type: TODO_FINDONE_REQUEST_SUCCESS,
    payload: json
  }
}

export function findOneRequestFailure(error) {
  return {
    type: TODO_FINDONE_REQUEST_FAILURE,
    payload: error
  }
}