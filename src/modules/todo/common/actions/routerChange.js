const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_ITEM

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