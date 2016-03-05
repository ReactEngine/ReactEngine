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
 * our 4 reducers
 */ 
import auth from './auth/reducers';
import device from './device/reducers';
import global from './global/reducers';
import profile from './profile/reducers';

import { combineReducers } from 'redux';

/**
 * ## CombineReducers
 * 
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */ 
const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile
});

export default rootReducer;
