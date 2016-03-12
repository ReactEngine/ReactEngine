'use strict'

const {

  USER_FORGOTPASSWORD_INIT_START,
  USER_FORGOTPASSWORD_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import { Actions } from 'react-native-router-flux'
const routerActions = Actions

import syncActions from './sync'
import loginActions from '../../login/actions'
import accessTokenActions from '../../../accessToken/actions'

import accessTokenStorage from '../../../../storage/accessToken'

//表单字段更新
export function forgotPasswordFormFieldChange(field,value) {
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
      email: username
    }

    return  ApiFactory().forgotPassword(userData)
      .then((json) => {
          //请求成功
          dispatch(syncActions.requestSuccess())
          //下一个场景准备: 初始化
          dispatch(loginActions.moduleInit())  
          // 切换路由到下一个场景: Login
          routerActions.Login()  
      })
      .catch((error) => {
			   dispatch(syncActions.requestFailure(error))
      })

  }
}
