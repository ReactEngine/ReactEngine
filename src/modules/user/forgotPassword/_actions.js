const {

  RESETPASSWORD_REQUEST,
  RESETPASSWORD_REQUEST_SUCCESS,
  RESETPASSWORD_REQUEST_FAILURE

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
      type: RESETPASSWORD_REQUEST_SUCCESS
    }
  }

export function   resetPasswordFailure(error) {
    return {
      type: RESETPASSWORD_REQUEST_FAILURE,
      payload: error
    }
  }

