'use strict'

const {

  FORGOTPASSWORD_MODULE_INIT,
  FORGOTPASSWORD_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../services/api').default

import { Actions } from 'react-native-router-flux'
const routerActions = Actions

import userActions from '../../actions/user'
import loginActions from '../login/actions'
import accessTokenActions from '../../actions/accessToken'

import accessTokenStorage from '../../storage/accessToken'

//表单字段更新
export function forgotPasswordFormFieldChange(field,value) {
  return {
    type: FORGOTPASSWORD_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: FORGOTPASSWORD_MODULE_INIT
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
    dispatch(userActions.forgotPasswordStart())

    const userData = {
      email: username
    }

    return  ApiFactory().forgotPassword(userData)
      .then((json) => {
          //请求成功
          dispatch(userActions.forgotPasswordSuccess())
          //下一个场景准备: 初始化
          dispatch(loginActions.moduleInit())  
          // 切换路由到下一个场景: Login
          routerActions.Login()  
      })
      .catch((error) => {
			   dispatch(userActions.forgotPasswordFailure(error))
      })

  }
}