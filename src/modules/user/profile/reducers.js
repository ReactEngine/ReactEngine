/**
 * # profileReducer.js
 * 
 * The reducer user profile actions
 */
'use strict'

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const fieldValidation = require('../../common/reducers/fieldValidation').default
const formValidation = require('./formValidation').default

/**
 * ## Actions
 *
 */
const {
  USER_LOGOUT_REQUEST_SUCCESS,

  USER_PROFILE_GET_START,
  USER_PROFILE_GET_SUCCESS,
  USER_PROFILE_GET_FAILURE,

  USER_PROFILE_UPDATE_START,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,

  USER_PROFILE_FORMFIELD_CHANGE,

} = require('../constants').default

/**
 * ## Initial State
 *
 */
const InitialState = require('./initialState').default
const initialState = new InitialState

/**
 * ## profileReducer function
 * @param {Object} state - initialState 
 * @param {Object} action - type and payload
 */
export default function profileReducer(state = initialState, action) {
  let nextProfileState = null

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */    
  case USER_PROFILE_GET_START:
  case USER_PROFILE_UPDATE_START:
    return state.setIn(['form', 'isFetching'], true)
      .setIn(['form','error'],null)

    /**
     * ### Request end successfully
     * set the form to fetching as done
     */    
  case USER_PROFILE_UPDATE_SUCCESS:
    return state.setIn(['form', 'isFetching'], false)

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */    
  case USER_PROFILE_GET_SUCCESS:
  
    nextProfileState = state.setIn(['form', 'isFetching'], false)
      .setIn(['form','fields','username'], action.payload.username)
      .setIn(['form','fields','email'], action.payload.email)
      .setIn(['form','fields','emailVerified'],
             action.payload.emailVerified)
      .setIn(['form','originalProfile','username'],action.payload.username)
      .setIn(['form','originalProfile','email'],action.payload.email)
      .setIn(['form','originalProfile','emailVerified'],action.payload.emailVerified)
      .setIn(['form','originalProfile','objectId'],action.payload.objectId)
      .setIn(['form','error'],null)
    
    return formValidation(
      fieldValidation( nextProfileState, action)
      , action)
    
    /**
     * User logged out, so reset form fields and original profile.
     * 
     */ 
  case USER_LOGOUT_REQUEST_SUCCESS:
    nextProfileState = state.setIn(['form','fields','username'], '')   
      .setIn(['form','fields','email'], '')
      .setIn(['form','fields','emailVerified'], false)
      .setIn(['form','originalProfile','username'],'')
      .setIn(['form','originalProfile','email'],'')
      .setIn(['form','originalProfile','emailVerified'],false)
      .setIn(['form','originalProfile','objectId'],null)
      .setIn(['form','error'],null)
    return formValidation( nextProfileState, action)

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
  case USER_PROFILE_GET_FAILURE:
  case USER_PROFILE_UPDATE_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form','error'], action.payload)

    /**
     * ### form fields have changed
     *
     * Set the state with the fields, clear the form error
     * and perform field and form validation
     */    
  case USER_PROFILE_FORMFIELD_CHANGE:
    let nextFormState =
      state.setIn(['form', 'fields', 'username'],
                  action.payload.field.username)
      .setIn(['form', 'fields', 'email'], action.payload.field.email)
      .setIn(['form','error'],null)

    return formValidation(
      fieldValidation( nextFormState, action)
      , action)

    
  }//switch
  
  /**
   * # Default
   */  
  return state
}
