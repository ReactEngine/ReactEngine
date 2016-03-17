'use strict'

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import * as syncActions from './index'

export function find(username, email, password) {
  
  return dispatch => {
    //请求开始
    dispatch(syncActions.requestStart())
    return  ApiFactory().todo.find()
      .then((json) => {
          //请求成功
			    dispatch(syncActions.requestSuccess(json))
      })
      .catch((error) => {
			   dispatch(syncActions.requestFailure(error))
      })

  }
}

export function deleteById(id="") {
  
  return dispatch => {
    //请求开始
    dispatch(syncActions.deleteStart())
    return  ApiFactory().todo.deleteById(id)
      .then((json) => {
          //请求成功
          dispatch(syncActions.deleteSuccess(json))
      })
      .catch((error) => {
         dispatch(syncActions.deleteFailure(error))
      })

  }
}
