const {

  STATE_LOGOUT,
  STATE_REGISTER,
  STATE_LOGIN

} = require('../../../common/constants').default
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
