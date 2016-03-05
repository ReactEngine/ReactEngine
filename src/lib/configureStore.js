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
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { asyncDispatch } from './redux-rest';

/**
* ## Reducer
* The reducer contains reducers
*/
import reducers from '../modules';

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */ 
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  asyncDispatch
)(createStore);

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 * 
 */
export default function configureStore(initialState) {
		return createStoreWithMiddleware(reducers, initialState);
};
