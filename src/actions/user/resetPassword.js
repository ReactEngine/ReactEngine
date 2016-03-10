const {

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE

} = require('../../constants').default
  /**
   * ## ResetPassword actions
   */
   resetPasswordRequest() {
    return {
      type: USER_RESETPASSWORD_REQUEST
    }
  }

   resetPasswordSuccess() {
    return {
      type: USER_RESETPASSWORD_SUCCESS
    }
  }

   resetPasswordFailure(error) {
    return {
      type: USER_RESETPASSWORD_FAILURE,
      payload: error
    }
  }

