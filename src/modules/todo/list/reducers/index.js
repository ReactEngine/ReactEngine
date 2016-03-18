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
  

  TODO_LIST,
  TODO_LIST_INIT_START,

  TODO_LIST_FIND_REQUEST_START,
  TODO_LIST_FIND_REQUEST_SUCCESS,
  TODO_LIST_FIND_REQUEST_FAILURE,

  TODO_LIST_CREATE_REQUEST_START,
  TODO_LIST_CREATE_REQUEST_SUCCESS,
  TODO_LIST_CREATE_REQUEST_FAILURE,

  TODO_LIST_COUNT_REQUEST_START,
  TODO_LIST_COUNT_REQUEST_SUCCESS,
  TODO_LIST_COUNT_REQUEST_FAILURE,

  TODO_LIST_UPDATE_REQUEST_START,
  TODO_LIST_UPDATE_REQUEST_SUCCESS,
  TODO_LIST_UPDATE_REQUEST_FAILURE,

  TODO_LIST_GETCHANGESTREAM_REQUEST_START,
  TODO_LIST_GETCHANGESTREAM_REQUEST_SUCCESS,
  TODO_LIST_GETCHANGESTREAM_REQUEST_FAILURE,

  TODO_LIST_CREATECHANGESTREAM_REQUEST_START,
  TODO_LIST_CREATECHANGESTREAM_REQUEST_SUCCESS,
  TODO_LIST_CREATECHANGESTREAM_REQUEST_FAILURE,

  TODO_LIST_UPSERT_REQUEST_START,
  TODO_LIST_UPSERT_REQUEST_SUCCESS,
  TODO_LIST_UPSERT_REQUEST_FAILURE

} = require('../../constants').default

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

     // case TODO_LIST_FIND_REQUEST_START:
     //  return state.setIn(['error'], null)
     //    .setIn(['isFetching'], true)

      case TODO_LIST_FIND_REQUEST_SUCCESS:
        return state.setIn(['isFetching'], false)
        .setIn(['isFetching'], true)
        .setIn(['data'], action.payload)
        .setIn(['options'], action.options)

      case TODO_LIST_FIND_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

  }
  /**
   * ## Default
   */
  return state
}