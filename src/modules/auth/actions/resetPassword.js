
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
  /**
   * ## ResetPassword
   *
   * @param {string} email - the email address to reset password
   * *Note* There's no feedback to the user whether the email
   * address is valid or not.
   *
   * This functionality depends on setting Parse.com
   * up correctly ie, that emails are verified.
   * With that enabled, an email can be sent w/ a
   * form for setting the new password.
   */
   resetPassword(email) {
    return dispatch => {
      dispatch(resetPasswordRequest())
      return APIFactory().resetPassword({
        email: email
      })
        .then(() => {
          dispatch(loginState())
          dispatch(resetPasswordSuccess())
        })
        .catch((error) => {
          dispatch(resetPasswordFailure(error))
        })

    }
  }
