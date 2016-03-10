const {

  STATE_LOGOUT,
  STATE_REGISTER,
  STATE_LOGIN,
  STATE_FORGOT_PASSWORD

} = require('../../constants').default
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function logout() {
  return {
    type: STATE_LOGOUT
  }

}
export function register() {
  return {
    type: STATE_REGISTER
  }
}

export function login() {
  return {
    type: STATE_LOGIN
  }
}

export function forgotPassword() {
  return {
    type: STATE_FORGOT_PASSWORD
  }
}
