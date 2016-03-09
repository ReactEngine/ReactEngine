const {

  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_REGISTER,
  LOGIN_STATE_LOGIN,
  LOGIN_STATE_FORGOT_PASSWORD,

  ON_AUTH_FORM_FIELD_CHANGE
} = require('../../lib/constants').default

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function logoutState() {
  return {
    type: LOGIN_STATE_LOGOUT
  }

}
export function registerState() {
  return {
    type: LOGIN_STATE_REGISTER
  }
}

export function loginState() {
  return {
    type: LOGIN_STATE_LOGIN
  }
}

export function forgotPasswordState() {
  return {
    type: LOGIN_STATE_FORGOT_PASSWORD
  }
}

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
