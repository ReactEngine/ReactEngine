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
import { createStore, applyMiddleware,combineReducers,compose } from 'redux';
import thunk from 'redux-thunk';
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
import reducers from '../reducers';

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk,logger),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);;



/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore(initialState) {
		return createStoreWithMiddleware(reducers, initialState);
};
