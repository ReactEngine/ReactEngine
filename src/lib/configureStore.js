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
import { asyncDispatch } from '../rest/redux-rest';
import createLogger from 'redux-logger';


const logger = createLogger({
  duration : true,
  timestamp : true,
  logger : console,
  logErrors : true
});

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
  asyncDispatch,
  logger
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
