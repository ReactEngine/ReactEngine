'use strict'

const {

  REGISTER_MODULE_INIT,
  REGISTER_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../services/api').default

import { Actions } from 'react-native-router-flux'
import userActions from '../../actions/user'
import logoutActions from '../logout/actions'
import accessTokenActions from '../../actions/accessToken'
const  accessTokenStorage = require('../../storage/accessToken').default
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
    type: REGISTER_MODULE_INIT
  }
}

export function register(username, email, password) {
  
  return dispatch => {
    //请求开始
    dispatch(userActions.registerStart())

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
					    dispatch(userActions.registerSuccess(data))
					    //下一个场景准备: 初始化
					    dispatch(logoutActions.moduleInit())  
					    // 切换路由到下一个场景: Tabbar
					    routerActions.Tabbar()  
			  		})
      })
      .catch((error) => {
			dispatch(userActions.registerFailure(error))
      })

  }
}
