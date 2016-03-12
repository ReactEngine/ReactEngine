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
const fieldValidation = require('../../common/reducers/fieldValidation').default
import formValidation from './formValidation'

/**
 * ## Auth actions
 */
const {
  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE,

  USER_LOGOUT_START,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_LOGOUT_VIEW_INIT,
  USER_LOGOUT_FORMFIELD_CHANGE

} = require('../../../constants').default

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

        case USER_LOGOUT_VIEW_INIT:
          return formValidation(
            state.setIn(['form','error'],null)
          )

        case ACCESSTOKEN_GET_START:
        case USER_LOGOUT_START:
          return state.setIn(['form', 'isFetching'], true)
            .setIn(['form','error'],null)

        case ACCESSTOKEN_GET_SUCCESS:
        case ACCESSTOKEN_GET_FAILURE:
        case USER_LOGOUT_SUCCESS:
          return state.setIn(['form', 'isFetching'], false)

        case USER_LOGOUT_FAILURE:
          return state.setIn(['form', 'isFetching'], false)
            .setIn(['form', 'error'], action.payload)
    }
  /**
   * ## Default
   */
  return state
}
