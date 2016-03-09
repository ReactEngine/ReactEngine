/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SET_ACCESSTOKEN,
  SET_STORE,
  STATE_SET,
  STATE_GET
} = require('../../../common/constants').default

/**
 * ## set the accessToken
 *
 */
export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESSTOKEN,
    payload: accessToken
  }
}
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store
  }
}
/**
 * ## set state
 *
 */
export function setState(newState) {
  return {
    type: STATE_SET,
    payload: newState
  }
}
/**
 * ## getState
 *
 */
export function getState(toggle) {
  return {
    type: STATE_GET,
    payload: toggle
  }
}
