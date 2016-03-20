'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('../initialState').default
import formValidation from './formValidation'
const fieldValidation = require('../../../common/reducers/fieldValidation').default

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
  TODO_FORMFIELD_CHANGE

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

    // case TODO_DELETE_START:
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

    //create
    case TODO_CREATE_REQUEST_START:
     return state.setIn(['form','error'], null)
       .setIn(['form','isFetching'], true)

    case TODO_CREATE_REQUEST_SUCCESS:
        return state.setIn(['form','isFetching'], false)
         .setIn(['form','error'], null)
         .setIn(['form','fields','id'], action.payload.res.id)
         .setIn(['form','fields','text'], action.payload.res.text)
         .setIn(['form','fields','completed'], action.payload.res.completed)
         .setIn(['form','fields','createdAt'], action.payload.res.createdAt)
         .setIn(['form','fields','updatedAt'], action.payload.res.updatedAt)


    case TODO_CREATE_REQUEST_FAILURE:
      return state.setIn(['form','isFetching'], false)
        .setIn(['form','error'], action.payload)

    //updateAttributes
    case TODO_UPDATEATTRIBUTES_REQUEST_START:
     return state.setIn(['form','isFetching'], true)
       .setIn(['form','error'], null)

    case TODO_UPDATEATTRIBUTES_REQUEST_SUCCESS:
      let item = action.payload.res
      return state.setIn(['form','isFetching'], false)
       .setIn(['form','error'], null)
       .setIn(['form','fields','id'], item.id)
       .setIn(['form','fields','text'], item.text)
       .setIn(['form','fields','completed'], item.completed)
       .setIn(['form','fields','createdAt'], item.createdAt)
       .setIn(['form','fields','updatedAt'], item.updatedAt)
      // return state.setIn(['form','isFetching'], false)
      //  .setIn(['form','error'], null)
      //  .setIn(['form','fields'], action.payload.item)

    case TODO_UPDATEATTRIBUTES_REQUEST_FAILURE:
      return state.setIn(['form','isFetching'], false)
        .setIn(['form','error'], action.payload)

    case TODO_FORMFIELD_CHANGE: {
      const {field, value} = action.payload
      let nextState =  state.setIn(['form', 'fields', field], value)
            .setIn(['form','error'],null)
      return formValidation(
        fieldValidation(nextState, action)
        , action)
    }
  }
  /**
   * ## Default
   */
  return state
}