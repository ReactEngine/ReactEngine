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
const InitialState = require('./initialState').default
import fieldValidation from '../../lib/fieldValidation'
import formValidation from './formValidation'

/**
 * ## Auth actions
 */
const {
  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE,

  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  LOGIN_MODULE_INIT,
  LOGIN_FORMFIELD_CHANGE

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

        case LOGIN_MODULE_INIT:
          return formValidation(
            state.setIn(['form','error'],null)
          )

        case ACCESSTOKEN_GET_START:
        case USER_LOGIN_START:
          return state.setIn(['form', 'isFetching'], true)
            .setIn(['form','error'],null)

        case ACCESSTOKEN_GET_SUCCESS:
        case ACCESSTOKEN_GET_FAILURE:
        case USER_LOGIN_SUCCESS:
          return state.setIn(['form', 'isFetching'], false)

        case USER_LOGIN_FAILURE:
          return state.setIn(['form', 'isFetching'], false)
            .setIn(['form', 'error'], action.payload)

        case LOGIN_FORMFIELD_CHANGE: {
          const {field, value} = action.payload
          let nextState =  state.setIn(['form', 'fields', field], value)
                .setIn(['form','error'],null)

          return formValidation(
            fieldValidation( nextState, action)
            , action)
        }
    }
  /**
   * ## Default
   */
  return state
}
