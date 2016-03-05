/**
 * # configureStore.js
 * 
 */

'use strict';

/**
 * ## Imports
 * 
 * redux functions
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loopback from './loopback'

/**
* ## Reducer
* The reducer contains reducers
*/
import reducer from '../modules';

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */ 
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  loopback()
)(createStore);

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 * 
 */ 
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
};
