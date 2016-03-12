import * as constantUtils from '../../../utils/constants'

const prefix = "MODULE$"

export default constantUtils.addPrefix([
  "ACCESSTOKEN_GET_START",
  "ACCESSTOKEN_GET_SUCCESS",
  "ACCESSTOKEN_GET_FAILURE",

  "ACCESSTOKEN_DELETE_START",
  "ACCESSTOKEN_DELETE_SUCCESS",
  "ACCESSTOKEN_DELETE_FAILURE"
],prefix)
