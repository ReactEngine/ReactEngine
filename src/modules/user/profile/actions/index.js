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
const accessTokenStorage = require('../../../../storage/accessToken').default
import syncActions from './sync'

//模块初始化
export function moduleInit() {
  return {
    type: USER_PROFILE_INIT_START
  }
}

/**
 * ## profileFormFieldChange
 * 
 */
export function profileFormFieldChange(field,value) {
  return {
    type: USER_PROFILE_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

/**
 * ## get
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(accessToken) {
  return dispatch => {
    //store or get a accessToken
    return new accessTokenStorage().get(accessToken)
      .then((token) => {
        //GET 请求开始
        dispatch(syncActions.getStart())
        return ApiFactory(token).getProfile()
      })
      .then((json) => {
          //GET 请求成功
          dispatch(syncActions.getSuccess(json))
      })
      .catch((error) => {
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
export function updateProfile(userId, username, email, accessToken) {
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
