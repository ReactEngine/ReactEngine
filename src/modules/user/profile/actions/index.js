const {

  USER_PROFILE_GET_START,
  USER_PROFILE_GET_SUCCESS,
  USER_PROFILE_GET_FAILURE,

  USER_PROFILE_UPDATE_START,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE

} = require('../../constants').default
/**
 * ## get actions
 */
export function getStart() {
  return {
    type: USER_PROFILE_GET_START
  }
}

export function getSuccess(json) {
  return {
    type: USER_PROFILE_GET_SUCCESS,
    payload: json
  }
}

export function getFailure(error) {
  return {
    type: USER_PROFILE_GET_FAILURE,
    payload: error
  }
}

/**
 * ## update actions
 */
export function updateStart() {
  return {
    type: USER_PROFILE_UPDATE_START
  }
}

export function updateSuccess(json) {
  return {
    type: USER_PROFILE_UPDATE_SUCCESS,
    payload: json
  }
}

export function updateFailure(error) {
  return {
    type: USER_PROFILE_UPDATE_FAILURE,
    payload: error
  }
}


//模块初始化
export function moduleInit() {
  return {
    type: USER_PROFILE_INIT_START
  }
}

/**
 * ## profileFormFieldChange
 * 
 */
export function formFieldChange(field,value) {
  return {
    type: USER_PROFILE_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
