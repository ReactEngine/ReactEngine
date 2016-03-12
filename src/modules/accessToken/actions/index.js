import * as privateActions from './_private'
import logoutActions from '../../user/logout/actions'

import { Actions }  from 'react-native-router-flux'
const  routerActions = Actions

import accessTokenStorage from '../../../storage/accessToken'

/**
 * ## Token
 * If accessTokenStorage has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getAccessToken() {
  return dispatch => {
    //获取开始
    dispatch(privateActions.GetStart())
    
    const errorHandle = (error)=>{
       //获取失败
        dispatch(privateActions.GetFailure(error))
        //下一个场景准备: 初始化
        // dispatch(logoutActions.moduleInit()) 
        //路由切换
        routerActions.Register()
    }

    return new accessTokenStorage().get()
      .then((token) => {
        if (token) {
          //获取成功
          dispatch(privateActions.GetSuccess(token))
          //下一个场景准备: 初始化
          // dispatch(logoutActions.moduleInit()) 
          //路由切换
          routerActions.Tabbar()
        } else {
          errorHandle()
        }
      })
      .catch(errorHandle)
  }
}

/**
 * ## saveAccessToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with accessToken
 */
export function saveAccessToken(json) {
  return new accessTokenStorage().save(json)
}

/**
 * ## Delete session token
 *
 * Call the accessTokenStorage deleteAccessToken 
 */
export function deleteAccessToken() {
  return dispatch => {
    //删除开始
    dispatch(privateActions.DeleteStart())
    
    return new  accessTokenStorage().delete()
      .then(() => {
        //删除成功
        dispatch(privateActions.DeleteSuccess())
      })
      .catch(error=>{
        //删除失败
        dispatch(privateActions.DeleteFailure(error))
      })
  }
}