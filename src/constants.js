import * as constantUtils from './utils/constants'

const prefix = "SYS"

export default constantUtils.addPrefix([
  "SET_PLATFORM",
  "SET_VERSION",
  
  "LOGGED_IN",
  "LOGGED_OUT",

  "SET_ACCESSTOKEN",

  "GET_STATE",
  "SET_STORE"

],prefix)
