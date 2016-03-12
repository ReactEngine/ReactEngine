import * as constantUtils from '../utils/constants'

const prefix = "SYS"

export default constantUtils.addPrefix([
  "SET_PLATFORM",
  "SET_VERSION",

  "ACCESSTOKEN_GET_START",
  "ACCESSTOKEN_GET_SUCCESS",
  "ACCESSTOKEN_GET_FAILURE",

  "DELETE_TOKEN_REQUEST",
  "DELETE_TOKEN_SUCCESS",
  
  "LOGGED_IN",
  "LOGGED_OUT",

  "SET_ACCESSTOKEN",

  "GET_STATE",
  "SET_STORE"

],prefix)
