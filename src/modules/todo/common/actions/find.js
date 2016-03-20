const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  TODO_FIND_REQUEST_START,
  TODO_FIND_REQUEST_SUCCESS,
  TODO_FIND_REQUEST_FAILURE,

} = require('../constants').default

//find
export function findRequestStart() {
  return {
    type: TODO_FIND_REQUEST_START
  }
}

export function findRequestSuccess(json,options) {
  return {
    type: TODO_FIND_REQUEST_SUCCESS,
    payload: json,
    options:options
  }
}

export function findRequestFailure(error) {
  return {
    type: TODO_FIND_REQUEST_FAILURE,
    payload: error
  }
}

export function find(filter,options) {
  return dispatch => {
    //请求开始
    dispatch(findRequestStart())
    return  ApiFactory().todo.find(filter)
      .then((data) => {
          // let rows = {}
          // const page = options.page || '1'
          // const header = 'Page_'+ page
          // rows[header] = data
          //请求成功
          dispatch(findRequestSuccess(data,options))
      })
      .catch((error) => {
         dispatch(findRequestFailure(error))
      })

  }
}

