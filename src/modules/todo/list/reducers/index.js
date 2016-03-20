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
  //create
  TODO_CREATE_REQUEST_START,
  TODO_CREATE_REQUEST_SUCCESS,
  TODO_CREATE_REQUEST_FAILURE,

  //find
  TODO_FIND_REQUEST_START,
  TODO_FIND_REQUEST_SUCCESS,
  TODO_FIND_REQUEST_FAILURE,

  //findById
  TODO_FINDBYID_REQUEST_START,
  TODO_FINDBYID_REQUEST_SUCCESS,
  TODO_FINDBYID_REQUEST_FAILURE,

  //findOne
  TODO_FINDONE_REQUEST_START,
  TODO_FINDONE_REQUEST_SUCCESS,
  TODO_FINDONE_REQUEST_FAILURE,

  //exists
  TODO_EXISTS_REQUEST_START,
  TODO_EXISTS_REQUEST_SUCCESS,
  TODO_EXISTS_REQUEST_FAILURE,

  //count
  TODO_COUNT_REQUEST_START,
  TODO_COUNT_REQUEST_SUCCESS,
  TODO_COUNT_REQUEST_FAILURE,

  //update
  TODO_UPDATE_REQUEST_START,
  TODO_UPDATE_REQUEST_SUCCESS,
  TODO_UPDATE_REQUEST_FAILURE,

  //upsert
  TODO_UPSERT_REQUEST_START,
  TODO_UPSERT_REQUEST_SUCCESS,
  TODO_UPSERT_REQUEST_FAILURE,

  //updateAttributes
  TODO_UPDATEATTRIBUTES_REQUEST_START,
  TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  TODO_UPDATEATTRIBUTES_REQUEST_FAILURE,

  //delete
  TODO_DELETE_REQUEST_START,
  TODO_DELETE_REQUEST_SUCCESS,
  TODO_DELETE_REQUEST_FAILURE,

  //getChangeStream
  TODO_GETCHANGESTREAM_REQUEST_START,
  TODO_GETCHANGESTREAM_REQUEST_SUCCESS,
  TODO_GETCHANGESTREAM_REQUEST_FAILURE,

  //createChangeStream
  TODO_CREATECHANGESTREAM_REQUEST_START,
  TODO_CREATECHANGESTREAM_REQUEST_SUCCESS,
  TODO_CREATECHANGESTREAM_REQUEST_FAILURE,

  TODO_LIST,
  TODO_LIST_INIT_START,

  TODO_ITEM,
  TODO_ITEM_INIT_START,
  TODO_FORMFIELD_CHANGE,

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
  const data = state.get('data')

  switch (action.type) {

    //create
    case TODO_CREATE_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case TODO_CREATE_REQUEST_SUCCESS:
    debugger
      return state.setIn(['isFetching'], false)
        .setIn(['error'], null)
        .setIn(['data'], [...data,
            action.payload.res])

    case TODO_CREATE_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //find
    case TODO_FIND_REQUEST_START:
     return state.setIn(['isFetching'], true)
          .setIn(['error'], null)
       

    case TODO_FIND_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], null)
        .setIn(['data'], action.payload.data)
        .setIn(['options'], action.payload.options)

    case TODO_FIND_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //updateAttributes
    case TODO_UPDATE_REQUEST_START:
    case TODO_UPDATEATTRIBUTES_REQUEST_START:
     return state.setIn(['isFetching'], true)
       .setIn(['error'], null)

    // case TODO_UPDATE_REQUEST_SUCCESS: //Todo
    case TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS:
      let index = _.findIndex(state.get('data'), function(item) { 
        return item.id == action.payload.res.id 
      })
      return state.setIn(['isFetching'], false)
          .setIn(['data'],[...data.slice(0, index),
            action.payload.res,
            ...data.slice(index + 1)]
      )

    case TODO_UPDATE_REQUEST_FAILURE:
    case TODO_UPDATEATTRIBUTES_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //delete
    case TODO_DELETE_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case TODO_DELETE_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
          .setIn(['data'], _.filter(state.get('data'),(item)=>{
            return item.id != action.payload.id
          }))

    case TODO_DELETE_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)


  }
  /**
   * ## Default
   */
  return state
}