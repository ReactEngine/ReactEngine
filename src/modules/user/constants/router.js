import * as constantUtils from '../../../utils/constants'

const prefix = "ROUTER$USER"

export default constantUtils.addPrefix([
  "USER_REGISTER",
  "USER_LOGIN",
  "USER_LOGOUT",
  "USER_FORGOTPASSWORD",
  "USER_PROFILE"
],prefix)
