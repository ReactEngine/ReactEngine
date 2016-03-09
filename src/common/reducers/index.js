/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
import auth from '../../modules/auth/reducers';
import device from '../../modules/device/reducers';
import global from '../../modules/global/reducers';
import profile from '../../modules/profile/reducers';
import reduxCrud from 'redux-crud';
import users from './users'

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const restReducer = apiBot.reducers

const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile,
  users
});

export default rootReducer;
