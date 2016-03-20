const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_ITEM,
  TODO_ITEM_INIT_START,

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

  TODO_ITEM_FORMFIELD_CHANGE

} = require('../../constants').default

export function routerChangeStart(payload) {
  return {
    type: TODO_ITEM,
    payload:payload
  }
}

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
export function deleteRequestSuccess(json,options) {
  return {
    type: TODO_ITEM_DELETE_REQUEST_SUCCESS,
    payload: json,
    options:options
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
export function updateAttributesRequestStart() {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_START
  }
}
export function updateAttributesRequestSuccess(json) {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateAttributesRequestFailure(error) {
  return {
    type: TODO_ITEM_UPDATEATTRIBUTES_REQUEST_FAILURE,
    payload: error
  }
}

export function formFieldChange(field,value) {
  return {
    type: TODO_ITEM_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}


export function routerChange(payload) {
  
  return dispatch => {
    //请求开始
    dispatch(routerChangeStart(payload))
}
}


export function updateAttributes(item) {
  return dispatch => {
    //请求开始
    dispatch(updateAttributesRequestStart())
    return  ApiFactory().todo.deleteById(id)
      .then((res) => {
          //请求成功
          dispatch(updateAttributesRequestSuccess(res,{item:item}))
      })
      .catch((error) => {
         dispatch(updateAttributesRequestFailure(error))
      })

  }
}

export function deleteById(id="") {
  return dispatch => {
    //请求开始
    dispatch(deleteRequestStart())
    return  ApiFactory().todo.deleteById(id)
      .then((json) => {
          //请求成功
          dispatch(deleteRequestSuccess(json,{id:id}))
      })
      .catch((error) => {
         dispatch(deleteRequestFailure(error))
      })

  }
}
