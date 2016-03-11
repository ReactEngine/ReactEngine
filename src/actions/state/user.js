const {
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  LOGOUT
} = require('../../constants').default
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function logout() {
  return {
    type: LOGOUT
  }

}
export function register() {
  return {
    type: REGISTER
  }
}

export function login() {
  return {
    type: LOGIN
  }
}

export function forgotPassword() {
  return {
    type: FORGOT_PASSWORD
  }
}
