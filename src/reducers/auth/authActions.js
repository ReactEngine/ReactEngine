/**
 * # authActions.js
 * 
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 * 
 */
'use strict'

/**
 * ## Imports
 * 
 * The actions supported
 */
const {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE,
  
  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  
  ON_AUTH_FORM_FIELD_CHANGE

} = require('../../constants').default

/**
 * Project requirements
 */
const ApiFactory = require('../../services/api').default

import {Actions} from 'react-native-router-flux'
import userActions from '../../actions/user'
import accessTokenActions from '../../actions/accessToken'
import userStateActions from '../../actions/state/user'

const  accessTokenStorage = require('../../services/storage/accessToken').default

const  _ = require('lodash')

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field,value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

/**
 * ## AccessToken actions
 */
export function accessTokenRequest() {
  return {
    type: ACCESSTOKEN_REQUEST
  }
}
export function accessTokenRequestSuccess(token) {
  return {
    type: ACCESSTOKEN_SUCCESS,
    payload: token
  }
}
export function accessTokenRequestFailure(error) {
  return {
    type: ACCESSTOKEN_FAILURE,
    payload: _.isUndefined(error) ? null:error
  }
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS
  }
}

/**
 * ## Delete session token
 *
 * Call the accessTokenStorage deleteAccessToken 
 */
export function deleteAccessToken() {
  return dispatch => {
    dispatch(deleteTokenRequest())
    return new  accessTokenStorage().delete()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}
/**
 * ## Token
 * If accessTokenStorage has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getAccessToken() {
  return dispatch => {
    dispatch(accessTokenRequest())
    
    return new accessTokenStorage().get()

      .then((token) => {
        if (token) {
          dispatch(accessTokenRequestSuccess(token))
          dispatch(userStateActions.logout())
          Actions.Tabbar()
        } else {
          dispatch(accessTokenRequestFailure())
          Actions.Register()
        }
      })
    
      .catch((error) => {
        dispatch(accessTokenRequestFailure(error))
        dispatch(userStateActions.login())
        Actions.Register()
      })
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
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call Parse.signup and if good, save the accessToken, 
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(username, email, password) {
  
  return dispatch => {
    dispatch(userActions.signupRequest())
    return  ApiFactory().signup({
      username: username,
      email: email,
      password: password
    })

      .then((json) => {
	return saveAccessToken(
	  Object.assign({}, json,
			{
			  username: username,
			  email: email
			})			
	)
        
          .then(() => {
	    dispatch(userActions.signupSuccess(
	      Object.assign({}, json,
			    {
			      username: username,
			      email: email
			    }
			   )
	    ))
	    dispatch(userStateActions.logout())  
	    // navigate to Tabbar
	    Actions.Tabbar()        
	  })
      })
      .catch((error) => {
	dispatch(userActions.signupFailure(error))
      })

  }
}

/**
 * ## Login 
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the accessToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login(username,  password) {
  return dispatch => {
    dispatch(userActions.loginRequest())
    return ApiFactory().login({
      username: username,
      password: password
    })

      .then(function (json) {
	return saveAccessToken(json)
	  .then(function () {
	    dispatch(userActions.loginSuccess(json))  
	    dispatch(userStateActions.logout())   
	    Actions.Tabbar() 
	  })
      })
      .catch((error) => {
	dispatch(userActions.loginFailure(error))
      })
  }
}

export function logout() {
  return dispatch => {
    dispatch(userActions.logoutRequest())
    return new accessTokenStorage().get()

      .then((token) => {
        return ApiFactory(token).logout()
      })
    
      .then(() => {
        dispatch(userStateActions.login())          
        dispatch(userActions.logoutSuccess())
        dispatch(deleteAccessToken())   
        Actions.Login()
      })                

      .catch((error) => {
        dispatch(userStateActions.login())        
        dispatch(userActions.logoutFailure(error))
        Actions.Login()
      })
  }
}

/**
 * ## ResetPassword 
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on setting maxleap.cn 
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email) {
  return dispatch => {
    dispatch(userActions.resetPasswordRequest())
    return ApiFactory().resetPassword({
      email: email
    })
      .then(() => {
        dispatch(userStateActions.login())
        dispatch(userActions.resetPasswordSuccess())
        Actions.Login()
      })
      .catch((error) => {
        dispatch(userActions.resetPasswordFailure(error))
      })

  }
}
