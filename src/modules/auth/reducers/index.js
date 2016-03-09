/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('../initialState').default
const fieldValidation = require('../../../common/reducers/fieldValidation').default
const formValidation = require('./formValidation').default

/**
 * ## Auth actions
 */
const {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE,

  STATE_LOGOUT,
  STATE_REGISTER,
  STATE_LOGIN,
  STATE_FORGOT_PASSWORD,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  ON_FORM_FIELD_CHANGE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE,

  STATE_SET
} = require('../../../common/constants').default

const initialState = new InitialState
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)
  switch (action.type) {

    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
  case ACCESSTOKEN_REQUEST:
  case USER_SIGNUP_REQUEST:
  case USER_LOGOUT_REQUEST:
  case USER_LOGIN_REQUEST:
  case USER_RESETPASSWORD_REQUEST:
    let nextState =  state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null)
    return nextState

    /**
     * ### Logout state
     * The user has successfully access Server
     * Clear the form's error and all the fields
     */
  case STATE_LOGOUT:
    return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form','error'],null)
        .setIn(['form','fields','username'],'')
        .setIn(['form','fields','email'],'')
        .setIn(['form','fields','password'],'')
        .setIn(['form','fields','passwordAgain'],'')
    )

    /**
     * ### Loggin in state
     * The user isn't logged in, and needs to
     * login, register or reset password
     *
     * Set the form state and clear any errors
     */
  case STATE_LOGIN:
  case STATE_REGISTER:
  case STATE_FORGOT_PASSWORD:
    return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form','error'],null)
    )

    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */
  case ON_FORM_FIELD_CHANGE: {
    const {field, value} = action.payload
    let nextState =  state.setIn(['form', 'fields', field], value)
          .setIn(['form','error'],null)

    var finalState = formValidation(
      fieldValidation( nextState, action)
      , action)

    return finalState
  }
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
  case ACCESSTOKEN_SUCCESS:
  case ACCESSTOKEN_FAILURE:
  case USER_SIGNUP_SUCCESS:
  case USER_LOGIN_SUCCESS:
  case USER_LOGOUT_SUCCESS:
  case USER_RESETPASSWORD_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)

    /**
     * ### Access to Server denied or failed
     * The fetching is done, but save the error
     * for display to the user
     */
  case USER_SIGNUP_FAILURE:
  case USER_LOGOUT_FAILURE:
  case USER_LOGIN_FAILURE:
  case USER_RESETPASSWORD_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload)

    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
  case STATE_SET:
    var form = JSON.parse(action.payload).auth.form

    var next = state.setIn(['form','state'],form.state)
          .setIn(['form','disabled'],form.disabled)
          .setIn(['form','error'], form.error)
          .setIn(['form','isValid'],form.isValid)
          .setIn(['form','isFetching'], form.isFetching)
          .setIn(['form','fields','username'],form.fields.username)
          .setIn(['form','fields','usernameHasError'],form.fields.usernameHasError)
          .setIn(['form','fields','email'],form.fields.email)
          .setIn(['form','fields','emailHasError'],form.fields.emailHasError)
          .setIn(['form','fields','password'],form.fields.password)
          .setIn(['form','fields','passwordHasError'],form.fields.passwordHasError)
          .setIn(['form','fields','passwordAgain'],form.fields.passwordAgain)
          .setIn(['form','fields','passwordAgainHasError'],form.fields.passwordAgainHasError)

    return next

  }
  /**
   * ## Default
   */
  return state
}
