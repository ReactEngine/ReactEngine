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
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../../common/constants').default

/**
 * APIFactory - base class for server implementation
 * store for store accessToken access 
 */
const APIFactory = require('../../../api').default
const store = require('../../../lib/store').default

/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: USER_GET_REQUEST
  }
}
export function getProfileSuccess(json) {
  return {
    type: USER_GET_SUCCESS,
    payload: json
  }
}
export function getProfileFailure(json) {
  return {
    type: USER_GET_FAILURE,
    payload: json
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
    return new store().getAccessToken(accessToken)
      .then((token) => {
        return APIFactory(token).getProfile()
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
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest() {
  return {
    type: USER_UPDATE_REQUEST
  }
}
export function profileUpdateSuccess() {
  return {
    type: USER_UPDATE_SUCCESS
  }
}
export function profileUpdateFailure(json) {
  return {
    type: USER_UPDATE_FAILURE,
    payload: json
  }
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId 
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} accessToken - the accessToken from Server
 *
 * The accessToken is provided when Hot Loading.
 *
 * With the accessToken, Server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on Server
 *
 */
export function updateProfile(userId, username, email, accessToken) {
  return dispatch => {
    dispatch(profileUpdateRequest())
    return new store().getAccessToken(accessToken)
      .then((token) => {
        return APIFactory(token).updateProfile(userId,
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
/**
 * ## onProfileFormFieldChange
 * 
 */
export function onProfileFormFieldChange(field,value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
