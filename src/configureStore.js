/**
 * # configureStore.js
 * 
 * A Redux boilerplate setup
 * 
 */
'use strict'

/**
 * ## Imports
 * 
 * redux functions
 */
import { createStore, applyMiddleware,combineReducers,compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import devTools from 'remote-redux-devtools'

const logger = createLogger({
  duration : true,
  timestamp : true,
  logger : console,
  logErrors : true
})


/**
* ## Reducer
* The reducer contains the 4 reducers from 
* device, global, auth, profile
*/
import moduleReducers from '../modules/reducers'

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 * 
 */ 
export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk,logger),
    devTools()
  )
  // Note: passing enhancer as last argument requires redux@>=3.1.0
  return createStore(moduleReducers, initialState, enhancer)
}
