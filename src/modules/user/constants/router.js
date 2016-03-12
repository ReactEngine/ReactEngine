import * as constantUtils from '../../../utils/constants'

const prefix = "ROUTER$USER"

export default constantUtils.addPrefix([
  "REGISTER",
  "LOGIN",
  "LOGOUT",
  "FORGOTPASSWORD",
  "PROFILE"
],prefix)
