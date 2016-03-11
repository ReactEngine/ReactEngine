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
 * our 4 reducers
 */ 
import register from './register/reducers'
import login from './login/reducers'
import logout from './logout/reducers'
import forgotPassword from './forgotPassword/reducers'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import profile from './profile/reducers'

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
