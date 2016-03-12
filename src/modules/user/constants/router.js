import * as constantUtils from '../../../utils/constants'

const prefix = "ROUTER$"

export default constantUtils.addPrefix([
  "userRegister",
  "userLogin",
  "userLogout",
  "userForgotPassword",
  "userProfile"
],prefix)
