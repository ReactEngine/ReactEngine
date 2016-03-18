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
import userRegister from './modules/user/register/reducers'
import userLogin from './modules/user/login/reducers'
import userLogout from './modules/user/logout/reducers'
import userForgotPassword from './modules/user/forgotPassword/reducers'
import userProfile from './modules/user/profile/reducers'

import todoItem from './modules/todo/item/reducers'
import todoList from './modules/todo/list/reducers'

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
  userRegister,
  userLogin,
  userLogout,
  userForgotPassword,
  userProfile,
  device,
  global,
  todoList,
  todoItem
})

export default rootReducer
