const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_UPDATEATTRIBUTES_REQUEST_START,
  TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  TODO_UPDATEATTRIBUTES_REQUEST_FAILURE,

} = require('../constants').default

//updateAttributes
export function updateAttributesRequestStart() {
  return {
    type: TODO_UPDATEATTRIBUTES_REQUEST_START
  }
}
export function updateAttributesRequestSuccess(json) {
  return {
    type: TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateAttributesRequestFailure(error) {
  return {
    type: TODO_UPDATEATTRIBUTES_REQUEST_FAILURE,
    payload: error
  }
}

export function updateAttributes(id,data) {
  return dispatch => {
    //请求开始
    dispatch(updateAttributesRequestStart())
    return  ApiFactory().todo.updateAttributes(id,data)
      .then((res) => {
          //请求成功
          dispatch(updateAttributesRequestSuccess({res:res}))
      })
      .catch((error) => {
         dispatch(updateAttributesRequestFailure(error))
      })

  }
}