const {

  RESETPASSWORD_REQUEST,
  RESETPASSWORD_REQUEST_SUCCESS,
  RESETPASSWORD_REQUEST_FAILURE

} = require('../constants').default
  /**
   * ## ResetPassword actions
   */
export function requestStart() {
    return {
      type: RESETPASSWORD_REQUEST
    }
  }

export function requestSuccess() {
    return {
      type: RESETPASSWORD_REQUEST_SUCCESS
    }
  }

export function requestFailure(error) {
    return {
      type: RESETPASSWORD_REQUEST_FAILURE,
      payload: error
    }
  }

