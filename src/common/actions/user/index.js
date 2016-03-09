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

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE

} = require('../../constants').default

const {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE

} = require('../../constants/user').default

/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default
import store from '../../../lib/store'

const  _ = require('lodash')

export default user {

  /**
   * ## Logout actions
   */
   logoutRequest() {
    return {
      type: USER_LOGOUT_REQUEST
    }
  }

   logoutSuccess() {
    return {
      type: USER_LOGOUT_SUCCESS
    }
  }

   logoutFailure(error) {
    return {
      type: USER_LOGOUT_FAILURE,
      payload: error
    }
  }
  /**
   * ## Login
   * After dispatching the logoutRequest, get the accessToken
   * and call Parse
   *
   * When the response from Parse is received and it's valid
   * change the state to register and finish the logout
   *
   * But if the call to Parse fails, like expired token or
   * no network connection, just send the failure
   *
   * And if you fail due to an invalid accessToken, be sure
   * to delete it so the user can log in.
   *
   * How could there be an invalid accessToken?  Maybe they
   * haven't used the app for a long time.  Or they used another
   * device and logged out there.
   */
   logout() {
    return dispatch => {
      dispatch(logoutRequest())
      return store.getAccessToken()
        .then((token) => {
          return BackendFactory(token).logout()
        })
        .then(() => {
          dispatch(registerState())
          dispatch(logoutSuccess())
          dispatch(deleteAccessToken())
        })
        .catch((error) => {
          dispatch(loginState())
          dispatch(logoutSuccess())
          dispatch(logoutFailure(error))
        })
    }

  }

  /**
   * ## Signup actions
   */
   signupRequest() {
    return {
      type: USER_SIGNUP_REQUEST
    }
  }
   signupSuccess(json) {
    return {
      type: USER_SIGNUP_SUCCESS,
      payload: json
    }
  }
   signupFailure(error) {
    return {
      type: USER_SIGNUP_FAILURE,
      payload: error
    }
  }
  /**
   * ## accessToken actions
   */
   accessTokenRequest() {
    return {
      type: ACCESSTOKEN_REQUEST
    }
  }
   accessTokenRequestSuccess(token) {
    return {
      type: ACCESSTOKEN_SUCCESS,
      payload: token
    }
  }
   accessTokenRequestFailure(error) {
    return {
      type: ACCESSTOKEN_FAILURE,
      payload: _.isUndefined(error) ? null:error
    }
  }

  /**
   * ## Delete session token
   *
   * Call the AppAuthToken deleteAccessToken
   */
   deleteAccessToken() {
    return dispatch => {
      dispatch(accessTokenRequest())
      return new  AppAuthToken().deleteAccessToken()
        .then(() => {
          dispatch(accessTokenRequestSuccess())
        })
    }
  }
  /**
   * ## getAccessToken
   * If AppAuthToken has the accessToken, the user is logged in
   * so set the state to logout.
   * Otherwise, the user will default to the login in screen.
   */
   getAccessToken() {
    return dispatch => {
      dispatch(accessTokenRequest())
      return store.getAccessToken()
        .then((token) => {
          if (token) {
            dispatch(logoutState())
            dispatch(accessTokenRequestSuccess(token))
          } else {
            dispatch(accessTokenRequestFailure())
          }
        })
        .catch((error) => {
          dispatch(accessTokenRequestFailure(error))
        })
    }
  }

  /**
   * ## saveaccessToken
   * @param {Object} response - to return to keep the promise chain
   * @param {Object} json - object with accessToken
   */
   saveaccessToken(json) {
    return store.storeaccessToken(json)
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
   signup(username, email, password) {
    return dispatch => {
      dispatch(signupRequest())
      return  BackendFactory().signup({
        username: username,
        email: email,
        password: password
      })
        .then(function (json) {
  	return saveaccessToken(json)
  	  .then(function () {
  	    dispatch(signupSuccess(
  	      Object.assign({},
  			    {
  			      username: username,
  			      email: email,
  			      objectId: json.objectId,
  			      createdAt: json.createdAt,
  			      accessToken: json.accessToken
  			    }
  			   )
  	    ))
  	    dispatch(logoutState())
  	  })
        })
        .catch((error) => {
  	dispatch(signupFailure(error))
        })
    }
  }

  /**
   * ## Login actions
   */
   loginRequest() {
    return {
      type: USER_LOGIN_REQUEST
    }
  }

   loginSuccess(json) {
    return {
      type: USER_LOGIN_SUCCESS,
      payload: json
    }
  }

   loginFailure(error) {
    return {
      type: USER_LOGIN_FAILURE,
      payload: error
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
   login(username,  password) {
    return dispatch => {
      dispatch(loginRequest())
      return BackendFactory().login({
        username: username,
        password: password
      })
        .then(function (json) {
  	return saveaccessToken(json)
  	  .then(function () {
  	    dispatch(loginSuccess(json))
  	    dispatch(logoutState())
  	  })
        })
        .catch((error) => {
  	dispatch(loginFailure(error))
        })
    }
  }

  /**
   * ## ResetPassword actions
   */
   resetPasswordRequest() {
    return {
      type: USER_RESETPASSWORD_REQUEST
    }
  }

   resetPasswordSuccess() {
    return {
      type: USER_RESETPASSWORD_SUCCESS
    }
  }

   resetPasswordFailure(error) {
    return {
      type: USER_RESETPASSWORD_FAILURE,
      payload: error
    }
  }
  /**
   * ## ResetPassword
   *
   * @param {string} email - the email address to reset password
   * *Note* There's no feedback to the user whether the email
   * address is valid or not.
   *
   * This functionality depends on setting Parse.com
   * up correctly ie, that emails are verified.
   * With that enabled, an email can be sent w/ a
   * form for setting the new password.
   */
   resetPassword(email) {
    return dispatch => {
      dispatch(resetPasswordRequest())
      return BackendFactory().resetPassword({
        email: email
      })
        .then(() => {
          dispatch(loginState())
          dispatch(resetPasswordSuccess())
        })
        .catch((error) => {
          dispatch(resetPasswordFailure(error))
        })

    }
  }

}
