const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_ITEM,
  TODO_LIST

} = require('../constants').default

export function routerChangeStart(payload) {
  return {
    type: TODO_ITEM,
    payload:payload
  }
}


export function routerChange(payload) {
  
  return dispatch => {
    //请求开始
    dispatch(routerChangeStart(payload))
}
}

export function routerChangeToListStart(payload) {
  return {
    type: TODO_LIST,
    payload:payload
  }
}


export function routerChangeToList(payload) {
  
  return dispatch => {
    //请求开始
    dispatch(routerChangeToListStart(payload))
}
}