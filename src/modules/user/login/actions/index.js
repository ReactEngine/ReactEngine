'use strict'

const {

  USER_LOGIN_INIT_START,
  USER_LOGIN_FORMFIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

import { Actions as routerActions }  from 'react-native-router-flux'

import * as syncActions from './sync'
// import * as logoutActions from '../../logout/actions'

import userStorage from '../../../../storage/user'

//表单字段更新
export function formFieldChange(field,value) {
  return {
    type: USER_LOGIN_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: USER_LOGIN_INIT_START
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
    dispatch(syncActions.requestStart())

    const userData = {
      email: email,
      password: password
    }

    return  ApiFactory().login(userData)
      .then((json) => {
  		
      let data = {
        email: email
      }
      data.accessToken = json.id
      data.ttl = json.ttl
      data.id = json.userId

			return new userStorage().save(data)
		          .then(() => {
		          //请求成功
					    dispatch(syncActions.requestSuccess(data))
					    //下一个场景准备: 初始化
					    // dispatch(logoutActions.moduleInit())  
					    // 切换路由到下一个场景: Tabbar
					    routerActions.Tabbar()
			  		})
      })
      .catch((error) => {
			   dispatch(syncActions.requestFailure(error))
      })

  }
}
