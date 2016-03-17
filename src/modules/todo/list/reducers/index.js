/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('../initialState').default

const {
  
  TODO_LIST_REQUEST_START,
  TODO_LIST_REQUEST_SUCCESS,
  TODO_LIST_REQUEST_FAILURE,

  TODO_ITEM_DELETE_START,
  TODO_ITEM_DELETE_SUCCESS,
  TODO_ITEM_DELETE_FAILURE

} = require('../constants').default

const initialState = new InitialState

/**
 * ## reducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {

    // case TODO_ITEM_DELETE_START:
     

  }
  /**
   * ## Default
   */
  return state
}