const {

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE

} = require('../../constants').default
  /**
   * ## ResetPassword actions
   */
export function   resetPasswordRequest() {
    return {
      type: USER_RESETPASSWORD_REQUEST
    }
  }

export function   resetPasswordSuccess() {
    return {
      type: USER_RESETPASSWORD_SUCCESS
    }
  }

export function   resetPasswordFailure(error) {
    return {
      type: USER_RESETPASSWORD_FAILURE,
      payload: error
    }
  }

