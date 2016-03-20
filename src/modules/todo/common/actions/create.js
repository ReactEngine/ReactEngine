const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_CREATE_REQUEST_START,
  TODO_CREATE_REQUEST_SUCCESS,
  TODO_CREATE_REQUEST_FAILURE,

} = require('../constants').default

//create
export function createRequestStart() {
  return {
    type: TODO_CREATE_REQUEST_START
  }
}

export function createRequestSuccess(json) {
  return {
    type: TODO_CREATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function createRequestFailure(error) {
  return {
    type: TODO_CREATE_REQUEST_FAILURE,
    payload: error
  }
}


export function create(data) {
  return dispatch => {
    //请求开始
    dispatch(createRequestStart())
    return  ApiFactory().todo.create(data)
      .then((res) => {
          //请求成功
          dispatch(createRequestSuccess({res:res}))
      })
      .catch((error) => {
         dispatch(createRequestFailure(error))
      })

  }
}