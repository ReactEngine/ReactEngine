/**
 * # profileActions.js
 * 
 * The actions to support the users profile
 */
'use strict'
/**
 * ## Imports
 * 
 * The actions for profile
 */
const {
  USER_PROFILE_INIT_START,
  USER_PROFILE_FORMFIELD_CHANGE
} = require('../../constants').default

/**
 * ApiFactory - base class for server implementation
 * accessTokenStorage for localStorage accessToken access 
 */
const ApiFactory = require('../../../../services/api').default
const userStorage = require('../../../../storage/user').default
import * as syncActions from './index'

/**
 * ## get
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getCurrentUser() {
  return dispatch => {
    debugger
    return new userStorage().get()
      .then((user) => {
        debugger
        const token = user.accessToken
        const userId = user.id
        if(!token || !userId){
          throw("get token or userId failed!")
        }else{
          //GET 请求开始
          dispatch(syncActions.getStart())
          return ApiFactory(token).getProfile(id)
        }
      })
      .then((json) => {
          //GET 请求成功
          dispatch(syncActions.getSuccess(json))
      })
      .catch((error)=>{
         //GET 请求失败
        dispatch(syncActions.getFailure(error))
      })
  }
}

/**
 * ## update 
 * @param {string} userId -  objectId 
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} accessToken - the accessToken from maxleap.cn
 *
 * The accessToken is provided when Hot Loading.
 *
 * With the accessToken, maxleap.cn is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on maxleap.cn
 *
 */
export function updateCurrentUser(userId, username, email) {
  return dispatch => {

    return new accessTokenStorage().get(accessToken)
      .then((token) => {
        //更新请求开始
        dispatch(syncActions.updateStart())

        return ApiFactory(token).updateProfile(userId,
          {
            username: username,
            email: email
          }
        )
      })
      .then(() => {
          //更新请求成功
          dispatch(syncActions.updateSuccess())
          dispatch(getProfile())
      })
      .catch((error) => {
        //更新请求失败
        dispatch(syncActions.updateFailure(error))
      })
  }
}
