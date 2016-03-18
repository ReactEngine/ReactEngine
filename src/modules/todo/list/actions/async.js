'use strict'

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import * as syncActions from './index'
import * as itemSyncActions from '../../item/actions'

export function find(filter,options) {
  
  return dispatch => {
    //请求开始
    dispatch(syncActions.findRequestStart())
    return  ApiFactory().todo.find(filter)
      .then((data) => {
          let rows = {}
          const page = options.page || '1'
          const header = 'Page_'+ page
          rows[header] = data
          //请求成功
			    dispatch(syncActions.findRequestSuccess(rows,options))
      })
      .catch((error) => {
			   dispatch(syncActions.findRequestFailure(error))
      })

  }
}

export function deleteById(id="") {
  
  return dispatch => {
    //请求开始
    dispatch(itemSyncActions.deleteRequestStart())
    return  ApiFactory().todo.deleteById(id)
      .then((json) => {
          //请求成功
          dispatch(itemSyncActions.deleteRequestSuccess(json))
      })
      .catch((error) => {
         dispatch(itemSyncActions.deleteRequestFailure(error))
      })

  }
}
