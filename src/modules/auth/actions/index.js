/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  AUTH_STATE_LOGOUT,
  AUTH_STATE_REGISTER,
  AUTH_STATE_LOGIN,
  AUTH_STATE_FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE

} = require('../../../common/constants').default;

/**
 * Project requirements
 */
const APIFactory = require('../../../api').default;

const  AppAuthToken = require('../../../lib/AppAuthToken').default;

const  _ = require('lodash');

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function logoutState() {
  return {
    type: AUTH_STATE_LOGOUT
  };

}
export function registerState() {
  return {
    type: AUTH_STATE_REGISTER
  };
}

export function loginState() {
  return {
    type: AUTH_STATE_LOGIN
  };
}

export function forgotPasswordState() {
  return {
    type: AUTH_STATE_FORGOT_PASSWORD
  };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field,value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}

/**
 * ## AccessToken actions
 */
export function accessTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST
  };
}
export function accessTokenRequestSuccess(token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token
  };
}
export function accessTokenRequestFailure(error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null:error
  };
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteAccessToken
 */
export function deleteAccessToken() {
  return dispatch => {
    dispatch(accessTokenRequest());
    return new  AppAuthToken().deleteAccessToken()
      .then(() => {
        dispatch(accessTokenRequestSuccess());
      });
  };
}
/**
 * ## getAccessToken
 * If AppAuthToken has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getAccessToken() {
  return dispatch => {
    dispatch(accessTokenRequest());
    return new AppAuthToken().getAccessToken()
      .then((token) => {
        if (token) {
          dispatch(logoutState());
          dispatch(accessTokenRequestSuccess(token));
        } else {
          dispatch(accessTokenRequestFailure());
        }
      })
      .catch((error) => {
        dispatch(accessTokenRequestFailure(error));
      });
  };
}

/**
 * ## saveAccessToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with accessToken
 */
export function saveAccessToken(json) {
  return new AppAuthToken().storeAccessToken(json);
}
