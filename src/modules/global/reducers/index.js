/**
 * # globalReducer.js
 * 
 *
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const {
  SET_ACCESSTOKEN,

  USER_GET_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,

  STATE_GET,
  STATE_SET,
  SET_STORE
  
} = require('../../../common/constants').default

import InitialState from '../initialState'

const initialState = new InitialState
/**
 * ## globalReducer function
 * @param {Object} state - initialState 
 * @param {Object} action - type and payload
 */
export default function globalReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    /**
     * ### Save the accessToken
     */
  case SET_ACCESSTOKEN:
    return state.set('accessToken', action.payload)
    
    /**
     * ### Save the payload in the store
     *
     * This payload is the ```currentUser``` object returned by
     * Server.  It contains the ```accessToken``` and the user's
     * ```objectId``` which will be needed for some calls to Maxleap
     */
  case USER_GET_SUCCESS:
  case USER_SIGNUP_SUCCESS:
  case USER_LOGIN_SUCCESS:
    return state.set('currentUser',action.payload)
    
    /**
     * ### sets the payload into the store
     *
     * *Note* this is for support of Hot Loading - the payload is the
     * ```store``` itself.
     *
     */
  case SET_STORE:
    return state.set('store',action.payload)

    /**
     * ### Get the current state from the store
     *
     * The Redux ```store``` provides the state object.
     * We convert each key to JSON and set it in the state
     *
     * *Note*: the global state removes the ```store```, otherwise,
     * when trying to convert to JSON, it will be recursive and fail
     */    
  case STATE_GET:
    let _state = state.store.getState()

    if (action.payload) {
      let newState = {}
      newState['auth'] = _state.auth.toJS()
      newState['device'] = _state.device.toJS()
      newState['profile'] = _state.profile.toJS()    
      newState['global'] = _state.global.set('store',null).toJS()

      return state.set('showState',action.payload)
        .set('currentState',newState)
    } else {
      return state.set('showState',action.payload)
    }

    /**
     * ### Set the state
     *
     * This is in support of Hot Loading
     *
     */    
  case STATE_SET:
    var global = JSON.parse(action.payload).global
    var next = state.set('currentUser', global.currentUser)
          .set('showState', false)
          .set('currentState', null)
    return next

  }
  
  return state
}
