/**
 * # reducers
 * 
 * This class combines all the reducers into one
 * 
 */
'use strict'
/**
 * ## Imports
 * 
 * our reducers
 */ 
import register from './modules/user/register/reducers'
import login from './modules/user/login/reducers'
import logout from './modules/user/logout/reducers'
import forgotPassword from './modules/user/forgotPassword/reducers'
import profile from './modules/user/profile/reducers'

import device from './modules/device/deviceReducer'
import global from './modules/global/globalReducer'

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 * 
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */ 
const rootReducer = combineReducers({
  register,
  login,
  logout,
  forgotPassword,
  device,
  global,
  profile
})

export default rootReducer
