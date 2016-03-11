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
  PROFILE_MODULE_INIT,
  PROFILE_FORMFIELD_CHANGE
} = require('../../constants').default

/**
 * ApiFactory - base class for server implementation
 * accessTokenStorage for localStorage accessToken access 
 */
const ApiFactory = require('../../services/api').default
const accessTokenStorage = require('../../storage/accessToken').default
import userActions from '../../actions/user'

//模块初始化
export function moduleInit() {
  return {
    type: PROFILE_MODULE_INIT
  }
}

/**
 * ## profileFormFieldChange
 * 
 */
export function profileFormFieldChange(field,value) {
  return {
    type: PROFILE_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(accessToken) {
  return dispatch => {
    dispatch(getProfileRequest())
    //store or get a accessToken
    return new accessTokenStorage().get(accessToken)
      .then((token) => {
        return ApiFactory(token).getProfile()
      })
      .then((json) => {
          dispatch(getProfileSuccess(json))
      })
      .catch((error) => {
        dispatch(getProfileFailure(error))
      })
  }
}

/**
 * ## updateProfile
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
    dispatch(profileUpdateRequest())
    return new accessTokenStorage().get(accessToken)
      .then((token) => {
        return ApiFactory(token).updateProfile(userId,
          {
            username: username,
            email: email
          }
        )
      })
      .then(() => {
          dispatch(profileUpdateSuccess())
          dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error))
      })
  }
}
