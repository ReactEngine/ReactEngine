const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  TODO_DELETE_REQUEST_START,
  TODO_DELETE_REQUEST_SUCCESS,
  TODO_DELETE_REQUEST_FAILURE,

} = require('../constants').default

//delete
export function deleteRequestStart() {
  return {
    type: TODO_DELETE_REQUEST_START
  }
}
export function deleteRequestSuccess(json,options) {
  return {
    type: TODO_DELETE_REQUEST_SUCCESS,
    payload: json,
    options:options
  }
}

export function deleteRequestFailure(error) {
  return {
    type: TODO_DELETE_REQUEST_FAILURE,
    payload: error
  }
}

export function deleteById(id="") {
  return dispatch => {
    //请求开始
    dispatch(deleteRequestStart())
    return  ApiFactory().todo.deleteById(id)
      .then((res) => {
          //请求成功
          dispatch(deleteRequestSuccess({res:res,id:id}))
      })
      .catch((error) => {
         dispatch(deleteRequestFailure(error))
      })

  }
}