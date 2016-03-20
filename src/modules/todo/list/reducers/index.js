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
  TODO_INIT_START,

  TODO_FIND_REQUEST_START,
  TODO_FIND_REQUEST_SUCCESS,
  TODO_FIND_REQUEST_FAILURE,

  TODO_CREATE_REQUEST_START,
  TODO_CREATE_REQUEST_SUCCESS,
  TODO_CREATE_REQUEST_FAILURE,

  TODO_COUNT_REQUEST_START,
  TODO_COUNT_REQUEST_SUCCESS,
  TODO_COUNT_REQUEST_FAILURE,

  TODO_UPDATE_REQUEST_START,
  TODO_UPDATE_REQUEST_SUCCESS,
  TODO_UPDATE_REQUEST_FAILURE,

  TODO_GETCHANGESTREAM_REQUEST_START,
  TODO_GETCHANGESTREAM_REQUEST_SUCCESS,
  TODO_GETCHANGESTREAM_REQUEST_FAILURE,

  TODO_CREATECHANGESTREAM_REQUEST_START,
  TODO_CREATECHANGESTREAM_REQUEST_SUCCESS,
  TODO_CREATECHANGESTREAM_REQUEST_FAILURE,

  TODO_UPSERT_REQUEST_START,
  TODO_UPSERT_REQUEST_SUCCESS,
  TODO_UPSERT_REQUEST_FAILURE,

  TODO_UPDATEATTRIBUTES_REQUEST_START,
  TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  TODO_UPDATEATTRIBUTES_REQUEST_FAILURE,

  TODO_DELETE_REQUEST_START,
  TODO_DELETE_REQUEST_SUCCESS,
  TODO_DELETE_REQUEST_FAILURE,

} = require('../../common/constants').default

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

    case TODO_FIND_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case TODO_FIND_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
        .setIn(['data'], action.payload)
        .setIn(['options'], action.options)

    case TODO_FIND_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    case TODO_DELETE_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case TODO_DELETE_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
          .setIn(['data'], _.filter(state.get('data'),(item)=>{
        return item.id != action.options.id
      }))

    case TODO_DELETE_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //updateAttributes
    case TODO_UPDATEATTRIBUTES_REQUEST_START:
     return state.setIn(['isFetching'], true)
       .setIn(['error'], null)

    case TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS:
      const data = state.get('data')
      let index = _.findIndex(state.get('data'), function(item) { 
        return item.id == action.payload.item.id 
      })
      return state.setIn(['isFetching'], false)
          .setIn(['data'],[...data.slice(0, index),
            action.payload.item,
            ...data.slice(index + 1)]
      )

    case TODO_UPDATEATTRIBUTES_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

  }
  /**
   * ## Default
   */
  return state
}