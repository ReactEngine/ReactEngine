const {

  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE

} = require('../constants').default
  /**
   * ## ResetPassword actions
   */
export function   resetPasswordRequest() {
    return {
      type: RESETPASSWORD_REQUEST
    }
  }

export function   resetPasswordSuccess() {
    return {
      type: RESETPASSWORD_SUCCESS
    }
  }

export function   resetPasswordFailure(error) {
    return {
      type: RESETPASSWORD_FAILURE,
      payload: error
    }
  }

