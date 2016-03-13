const {
  USER_FORGOTPASSWORD_REQUEST_START,
  USER_FORGOTPASSWORD_REQUEST_SUCCESS,
  USER_FORGOTPASSWORD_REQUEST_FAILURE,

} = require('../../constants').default
  /**
   * ## ResetPassword actions
   */
export function requestStart() {
    return {
      type: USER_FORGOTPASSWORD_REQUEST_START
    }
  }

export function requestSuccess() {
    return {
      type: USER_FORGOTPASSWORD_REQUEST_SUCCESS
    }
  }

export function requestFailure(error) {
    return {
      type: USER_FORGOTPASSWORD_REQUEST_FAILURE,
      payload: error
    }
  }

