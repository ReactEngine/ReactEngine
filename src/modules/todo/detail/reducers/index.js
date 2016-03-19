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

  TODO_ITEM,
  TODO_ITEM_INIT_START,

  TODO_ITEM_EXISTS_REQUEST_START,
  TODO_ITEM_EXISTS_REQUEST_SUCCESS,
  TODO_ITEM_EXISTS_REQUEST_FAILURE,

  TODO_ITEM_FINDBYID_REQUEST_START,
  TODO_ITEM_FINDBYID_REQUEST_SUCCESS,
  TODO_ITEM_FINDBYID_REQUEST_FAILURE,

  TODO_ITEM_FINDONE_REQUEST_START,
  TODO_ITEM_FINDONE_REQUEST_SUCCESS,
  TODO_ITEM_FINDONE_REQUEST_FAILURE,

  TODO_ITEM_DELETE_REQUEST_START,
  TODO_ITEM_DELETE_REQUEST_SUCCESS,
  TODO_ITEM_DELETE_REQUEST_FAILURE,

  TODO_ITEM_UPDATE_REQUEST_START,
  TODO_ITEM_UPDATE_REQUEST_SUCCESS,
  TODO_ITEM_UPDATE_REQUEST_FAILURE,

  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_START,
  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  TODO_ITEM_UPDATEATTRIBUTES_REQUEST_FAILURE,

  TODO_ITEM_FORMFIELD_CHANGE

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

    // case TODO_ITEM_DELETE_START:
    case TODO_ITEM:
    
     let newState = state.setIn(['form','isFetching'], false)
        .setIn(['form','fields','id'], action.payload.fields.id)
        .setIn(['form','fields','text'], action.payload.fields.text)
        .setIn(['form','fields','completed'], action.payload.fields.completed)
        .setIn(['form','fields','createdAt'], action.payload.fields.createdAt)
        .setIn(['form','fields','updatedAt'], action.payload.fields.updatedAt)
        .setIn(['form','title'], action.payload.title)
        console.log('TODO_ITEM newState:',newState)
        return newState

  }
  /**
   * ## Default
   */
  return state
}