'use strict'

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import * as syncActions from './index'
import * as itemSyncActions from '../../item/actions'

export function find(username, email, password) {
  
  return dispatch => {
    //请求开始
    dispatch(syncActions.getStart())
    return  ApiFactory().todo.find()
      .then((json) => {
          //请求成功
			    dispatch(syncActions.getSuccess(json))
      })
      .catch((error) => {
			   dispatch(syncActions.getFailure(error))
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