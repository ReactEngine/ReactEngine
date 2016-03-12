import * as accessTokenActions from '../accessToken/actions/sync'

import accessTokenStorage from '../../storage/accessToken'

import { Actions as routerActions }  from 'react-native-router-flux'

/**
 * ## Token
 * If accessTokenStorage has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function checkAccessToken() {
  return dispatch => {
    //获取开始
    dispatch(accessTokenActions.GetStart())
    
    const errorHandle = (error)=>{
       //获取失败
        dispatch(accessTokenActions.GetFailure(error))
        //下一个场景准备: 初始化
        // dispatch(logoutActions.moduleInit()) 
        //路由切换
        routerActions.userRegister()
    }

    return new accessTokenStorage().get()
      .then((token) => {
        if (token) {
          //获取成功
          dispatch(accessTokenActions.GetSuccess(token))
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