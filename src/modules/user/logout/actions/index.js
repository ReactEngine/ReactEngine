'use strict'

const {

  USER_LOGOUT_INIT_START,
  USER_LOGOUT_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import { Actions as routerActions }  from 'react-native-router-flux'
import * as syncActions from './sync'
import * as accessTokenActions from '../../../accessToken/actions'
// import * as loginActions from '../../login/actions'

// import accessTokenStorage from '../../../../storage/accessToken'

//表单字段更新
export function formFieldChange(field,value) {
  return {
    type: USER_LOGOUT_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: USER_LOGOUT_INIT_START
  }
}

/**
 * ## Login 
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the accessToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
export function logout(email, password) {
  return dispatch => {
    //请求开始
    // dispatch(syncActions.requestStart())

    // const logoutHandle = () => {
      debugger
        //清除 AccessToken
        dispatch(accessTokenActions.deleteAccessToken())
        //下一个场景准备: 初始化
        // dispatch(loginActions.moduleInit())  
        // 切换路由到下一个场景: Login
        routerActions.userLogin()  
    // }

    return logoutHandle
    // new accessTokenStorage().get()
    //   .then((token) => {
    //     return ApiFactory(token).logout()
    //   })
    //   .then(() => {
    //       //请求成功
    //      dispatch(syncActions.requestSuccess(data))
    //      logoutHandle()
    //    })
    //   .catch((error) => {
    //       //请求失败
			 //   dispatch(syncActions.requestFailure(error))
    //      logoutHandle()
    //   })
  }
}
