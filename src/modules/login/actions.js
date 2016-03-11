'use strict'

const {

  LOGIN_MODULE_INIT,
  LOGIN_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../services/api').default

import { Actions } from 'react-native-router-flux'
const routerActions = Actions

import userActions from '../../actions/user'
import logoutActions from '../logout/actions'
import accessTokenActions from '../../actions/accessToken'

import accessTokenStorage from '../../storage/accessToken'

//表单字段更新
export function loginFormFieldChange(field,value) {
  return {
    type: LOGIN_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: LOGIN_MODULE_INIT
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
export function login(email, password) {
  
  return dispatch => {
    //请求开始
    dispatch(userActions.loginStart())

    const userData = {
      email: username,
      password: password
    }

    return  ApiFactory().login(userData)
      .then((json) => {
      		const data = Object.assign({}, json,
						{
						  email: email
						})

			return saveAccessToken(data)
		          .then(() => {
		          //请求成功
					    dispatch(userActions.loginSuccess(data))
					    //下一个场景准备: 初始化
					    dispatch(logoutActions.moduleInit())  
					    // 切换路由到下一个场景: Tabbar
					    routerActions.Tabbar()  
			  		})
      })
      .catch((error) => {
			   dispatch(userActions.loginFailure(error))
      })

  }
}
