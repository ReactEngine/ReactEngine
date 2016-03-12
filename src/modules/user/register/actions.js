'use strict'

const {

  REGISTER_INIT_START,
  REGISTER_FORMFIELD_CHANGE

} = require('../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../services/api').default

import { Actions } from 'react-native-router-flux'
import privateActions from './_actions'
import logoutActions from '../logout/actions'
import accessTokenActions from '../../../actions/accessToken'
import accessTokenStorage from '../../../storage/accessToken'
const routerActions = Actions

//表单字段更新
export function registerFormFieldChange(field,value) {
  return {
    type: REGISTER_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: REGISTER_INIT_START
  }
}

/**
 * ## register
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call Parse.register and if good, save the accessToken, 
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function register(username, email, password) {
  
  return dispatch => {
    //请求开始
    dispatch(privateActions.registerStart())

    const userData = {
      username: username,
      email: email,
      password: password
    }

    return  ApiFactory().register(userData)
      .then((json) => {
      		const data = Object.assign({}, json,
						{
						  username: username,
						  email: email
						})

			return saveAccessToken(data)
		          .then(() => {
		          		//请求成功
					    dispatch(privateActions.registerSuccess(data))
					    //下一个场景准备: 初始化
					    dispatch(logoutActions.moduleInit())  
					    // 切换路由到下一个场景: Tabbar
					    routerActions.Tabbar()  
			  		})
      })
      .catch((error) => {
			dispatch(privateActions.registerFailure(error))
      })

  }
}
