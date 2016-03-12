'use strict'

const {

  USER_LOGOUT_INIT_START,
  USER_LOGOUT_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import { Actions } from 'react-native-router-flux'
import privateActions from './_private'
import accessTokenActions from '../../../accessToken/actions'
import loginActions from '../login/actions'

import accessTokenStorage from '../../../../storage/accessToken'
const routerActions = Actions

//表单字段更新
export function logoutFormFieldChange(field,value) {
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
  
  const logoutHandle = () => {
      //清除 AccessToken
      dispatch(deleteAccessToken())
      //下一个场景准备: 初始化
      dispatch(loginActions.moduleInit())  
      // 切换路由到下一个场景: Login
      routerActions.Login()  
  }

  return dispatch => {
    //请求开始
    dispatch(privateActions.requestStart())

    return 
    new accessTokenStorage().get()
      .then((token) => {
        return ApiFactory(token).logout()
      })
      .then(() => {
          //请求成功
         dispatch(privateActions.requestSuccess(data))
         logoutHandle()
       })
      .catch((error) => {
          //请求失败
			   dispatch(privateActions.requestFailure(error))
         logoutHandle()
      })
  }
}
