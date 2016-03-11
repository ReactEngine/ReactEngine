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
const fieldValidation = require('../../lib/fieldValidation').default

/**
 * ## Auth actions
 */
const {
  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE,

  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,

  REGISTER_MODULE_INIT,
  REGISTER_FORMFIELD_CHANGE

} = require('../../constants').default

const initialState = new InitialState

function formValidation (state) {
  if (state.form.fields.username != ''
      &&
      state.form.fields.email !== ''
      &&
      state.form.fields.password !== ''
      &&
      !state.form.fields.usernameHasError
      &&
      !state.form.fields.emailHasError
      &&
      !state.form.fields.passwordHasError) {
    return state.setIn(['form','isValid'],true)
  } else {
    return state.setIn(['form','isValid'],false)
  }
}

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
  case ACCESSTOKEN_GET_START:
  case USER_REGISTER_START:
    let nextState =  state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null)
    return nextState

  case REGISTER_MODULE_INIT:
    return formValidation(
      state.setIn(['form','error'],null)
    )

    /**
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */
  case REGISTER_FORMFIELD_CHANGE: 
    const {field, value} = action.payload
    let nextState =  state.setIn(['form', 'fields', field], value)
          .setIn(['form','error'],null)

    const finalState = formValidation(
      fieldValidation( nextState, action)
      , action)

    return finalState
  
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
  case ACCESSTOKEN_GET_SUCCESS:
  case ACCESSTOKEN_GET_FAILURE:
  case USER_REGISTER_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)

    /**
     * ### Access to maxleap.cn denied or failed
     * The fetching is done, but save the error
     * for display to the user
     */
  case USER_REGISTER_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload)

  }
  /**
   * ## Default
   */
  return state
}
