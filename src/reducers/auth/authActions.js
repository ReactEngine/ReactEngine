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

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  
  ON_AUTH_FORM_FIELD_CHANGE

} = require('../../constants').default

const  _ = require('lodash')

const ApiFactory = require('../../services/api').default

import {Actions} from 'react-native-router-flux'
import userActions from '../../actions/user'
import accessTokenActions from '../../actions/accessToken'
import userStateActions from '../../actions/state/user'
debugger
const  accessTokenStorage = require('../../services/storage/accessToken').default

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
