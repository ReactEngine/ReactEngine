// import Constant from '../lib/constant'

//添加前缀
function addPrefix(obj,prefix) {
    var key
    var mirrored = {}
    prefix = prefix || "$RE_$"

    if (typeof obj === 'object' ) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                mirrored[key] = prefix + key
            }
        }
    }

    return mirrored
}

export default addPrefix({
  SET_PLATFORM: null,
  SET_VERSION: null,

  ACCESSTOKEN_REQUEST: null,
  ACCESSTOKEN_SUCCESS: null,
  ACCESSTOKEN_FAILURE: null,

  DELETE_TOKEN_REQUEST: null,
  DELETE_TOKEN_SUCCESS: null,

  ON_LOGIN_STATE_CHANGE: null,
  LOGOUT: null,

  ON_AUTH_FORM_FIELD_CHANGE: null,
  SIGNUP_REQUEST: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  LOGGED_IN: null,
  LOGGED_OUT: null,

  SET_ACCESSTOKEN: null,

  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,

  GET_PROFILE_REQUEST: null,
  GET_PROFILE_SUCCESS: null,
  GET_PROFILE_FAILURE: null,

  ON_PROFILE_FORM_FIELD_CHANGE: null,

  PROFILE_UPDATE_REQUEST: null,
  PROFILE_UPDATE_SUCCESS: null,
  PROFILE_UPDATE_FAILURE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,

  FORGOT_PASSWORD: null,
  LOGIN: null,
  REGISTER: null,

  STATE_LOGOUT:null,
  STATE_REGISTER:null,
  STATE_LOGIN:null,
  STATE_FORGOT_PASSWORD:null

})
