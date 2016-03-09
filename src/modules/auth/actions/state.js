/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function logoutState() {
  return {
    type: STATE_LOGOUT
  }

}
export function registerState() {
  return {
    type: STATE_REGISTER
  }
}

export function loginState() {
  return {
    type: STATE_LOGIN
  }
}

export function forgotPasswordState() {
  return {
    type: STATE_FORGOT_PASSWORD
  }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field,value) {
  return {
    type: ON_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
