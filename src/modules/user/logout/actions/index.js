const {

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_REQUEST_SUCCESS,
  USER_LOGOUT_REQUEST_FAILURE

} = require('../../constants').default
/**
 * ## Logout actions
 */
export function requestRequest() {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

export function requestSuccess() {
  return {
    type: USER_LOGOUT_REQUEST_SUCCESS
  }
}

export function requestFailure(error) {
  return {
    type: USER_LOGOUT_REQUEST_FAILURE,
    payload: error
  }
}

//表单字段更新
export function formFieldChange(field,value) {
  return {
    type: USER_LOGOUT_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

//模块初始化
export function moduleInit() {
  return {
    type: USER_LOGOUT_INIT_START
  }
}