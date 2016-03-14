'use strict'

const {

  USER_FORGOTPASSWORD_INIT_START,
  USER_FORGOTPASSWORD_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import { Actions as routerActions }  from 'react-native-router-flux'

import * as syncActions from './index'
// import * as loginActions from '../../login/actions'

//表单字段更新
export function formFieldChange(field,value) {
  return {
    type: USER_FORGOTPASSWORD_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: USER_FORGOTPASSWORD_INIT_START
  }
}

/**
 * ## forgotPassword 
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the accessToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function forgotPassword(email) {
  
  return dispatch => {
    
    //请求开始
    dispatch(syncActions.requestStart())

    const userData = {
      email: email
    }

    const successHandle = (data)=>{
        //请求成功
        dispatch(syncActions.requestSuccess(data))
        //下一个场景准备: 初始化
        // dispatch(logoutActions.moduleInit())  
        // 切换路由到下一个场景
        routerActions.userLogin()  
      }

    return  ApiFactory().forgotPassword(userData)
      .then((json) => {
          successHandle(json)
      })
      .catch((error) => {
        successHandle()
			   // dispatch(syncActions.requestFailure(error))
      })

  }
}
