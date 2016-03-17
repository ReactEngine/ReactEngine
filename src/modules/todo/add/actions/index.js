const {

  TODO_ITEM_EXISTS_REQUEST_START,
  TODO_ITEM_EXISTS_REQUEST_SUCCESS,
  TODO_ITEM_EXISTS_REQUEST_FAILURE,

  TODO_ITEM_FINDBYID_REQUEST_START,
  TODO_ITEM_FINDBYID_REQUEST_SUCCESS,
  TODO_ITEM_FINDBYID_REQUEST_FAILURE,

  TODO_ITEM_FINDONE_REQUEST_START,
  TODO_ITEM_FINDONE_REQUEST_SUCCESS,
  TODO_ITEM_FINDONE_REQUEST_FAILURE,

  TODO_ITEM_DELETE_REQUEST_START,
  TODO_ITEM_DELETE_REQUEST_SUCCESS,
  TODO_ITEM_DELETE_REQUEST_FAILURE,

  TODO_ITEM_UPDATE_REQUEST_START,
  TODO_ITEM_UPDATE_REQUEST_SUCCESS,
  TODO_ITEM_UPDATE_REQUEST_FAILURE,

  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_START,
  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_FAILURE,

} = require('../../constants').default

//exists
export function existsRequestStart() {
  return {
    type: TODO_ITEM_EXISTS_REQUEST_START
  }
}

export function existsRequestSuccess(json) {
  return {
    type: TODO_ITEM_EXISTS_REQUEST_SUCCESS,
    payload: json
  }
}

export function existsRequestFailure(error) {
  return {
    type: TODO_ITEM_EXISTS_REQUEST_FAILURE,
    payload: error
  }
}

//findById
export function findByIdRequestStart() {
  return {
    type: TODO_ITEM_FINDBYID_REQUEST_START
  }
}

export function findByIdRequestSuccess(json) {
  return {
    type: TODO_ITEM_FINDBYID_REQUEST_SUCCESS,
    payload: json
  }
}

export function findByIdRequestFailure(error) {
  return {
    type: TODO_ITEM_FINDBYID_REQUEST_FAILURE,
    payload: error
  }
}

//findOne
export function findOneRequestStart() {
  return {
    type: TODO_ITEM_FINDONE_REQUEST_START
  }
}

export function findOneRequestSuccess(json) {
  return {
    type: TODO_ITEM_FINDONE_REQUEST_SUCCESS,
    payload: json
  }
}

export function findOneRequestFailure(error) {
  return {
    type: TODO_ITEM_FINDONE_REQUEST_FAILURE,
    payload: error
  }
}

//delete
export function deleteRequestStart() {
  return {
    type: TODO_ITEM_DELETE_REQUEST_START
  }
}
export function deleteRequestSuccess(json) {
  return {
    type: TODO_ITEM_DELETE_REQUEST_SUCCESS,
    payload: json
  }
}

export function deleteRequestFailure(error) {
  return {
    type: TODO_ITEM_DELETE_REQUEST_FAILURE,
    payload: error
  }
}

//update
export function updateRequestStart() {
  return {
    type: TODO_ITEM_UPDATE_REQUEST_START
  }
}
export function updateRequestSuccess(json) {
  return {
    type: TODO_ITEM_UPDATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateRequestFailure(error) {
  return {
    type: TODO_ITEM_UPDATE_REQUEST_FAILURE,
    payload: error
  }
}

//updateAttributes
export function updateAttributesStart() {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_START
  }
}
export function updateAttributesSuccess(json) {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateAttributesFailure(error) {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_FAILURE,
    payload: error
  }
}
