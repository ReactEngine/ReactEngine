/**
 * # authActions-test.js
 * 
 * This test is for authActions
 *
 */
'use strict'
jest.autoMockOff()

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call maxleap.cn
 */
jest.mock('../../../storage/accessToken')
jest.mock('../../../services/api')

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
var mockStore = require('../../mocks/Store').default

/**
 * ## Class under test
 *
 */
var actions = require('../authActions')

/**
 * ## Imports
 * 
 * actions under test 
 */
const {
  ACCESSTOKEN_GET_START,
  ACCESSTOKEN_GET_SUCCESS,
  ACCESSTOKEN_GET_FAILURE,

  DELETE_TOKEN_REQUEST,
  
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  
  ON_AUTH_FORM_FIELD_CHANGE,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} = require('../../../constants').default

/**
 * ## Tests
 * 
 * authActions
 */
describe('authActions', () => {
  /**
   * ### simple tests that prove the actions have the specific type
   */ 
  it('should set logoutState', () => {
    expect(actions.logoutState()).toEqual({type: LOGOUT })
  })

  it('should set registerState', () => {
    expect(actions.registerState()).toEqual({type: REGISTER })
  })

  it('should set loginState', () => {
    expect(actions.loginState()).toEqual({type: LOGIN})
  })
  
  it('should set forgotPasswordState', () => {
    expect(actions.forgotPasswordState()).toEqual({type: FORGOT_PASSWORD})
  })

  it('should set logoutRequest', () => {
    expect(actions.logoutRequest()).toEqual({type: LOGOUT_REQUEST})
  })

  it('should set logoutSuccess', () => {
    expect(actions.logoutSuccess()).toEqual({type: LOGOUT_SUCCESS})
  })

  it('should set logoutFailure', () => {
    let error = {error: 'test error'}
    expect(actions.logoutFailure(error)).toEqual({type:
                                                  LOGOUT_FAILURE,
                                                  payload: error})

  })
  
  it('should set registerStart', () => {
    expect(actions.registerStart()).toEqual({type: USER_REGISTER_START})
  })

  it('should set registerSuccess', () => {
    expect(actions.registerSuccess()).toEqual({type: USER_REGISTER_SUCCESS})
  })

  it('should set accessTokenRequest', () => {
    expect(actions.accessTokenRequest()).toEqual({type: ACCESSTOKEN_GET_START})
  })

  it('should set accessTokenRequestSuccess', () => {
    let token = {token: 'thisisthetoken'}
    expect(actions.accessTokenRequestSuccess(token)).toEqual({
      type:ACCESSTOKEN_GET_SUCCESS,payload:token})
  })

  it('should set accessTokenRequestFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.accessTokenRequestFailure(error)).toEqual({
      type: ACCESSTOKEN_GET_FAILURE,payload: error })
  })

  it('should set registerFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.registerFailure(error)).toEqual({type:
                                                  USER_REGISTER_FAILURE, payload:error})
  })

  it('should set loginRequest', () => {
    expect(actions.loginRequest()).toEqual({type: LOGIN_REQUEST})
  })

  it('should set loginSuccess', () => {
    expect(actions.loginSuccess()).toEqual({type: LOGIN_SUCCESS})
  })

  it('should set loginFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.loginFailure(error)).toEqual({type: LOGIN_FAILURE,
                                                 payload: error})
  })

  it('should set resetPasswordRequest', () => {
    expect(actions.resetPasswordRequest()).toEqual({type: RESET_PASSWORD_REQUEST})
  })

  it('should set resetPasswordSuccess', () => {
    expect(actions.resetPasswordSuccess()).toEqual({type: RESET_PASSWORD_SUCCESS})
  })

  it('should set resetPasswordFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.resetPasswordFailure(error)).toEqual({type:
                                                         RESET_PASSWORD_FAILURE,
                                                         payload: error})


  })

  it('should set onAuthFormFieldChange', () => {
    let field = 'field'
    let value = 'value'
    expect(actions.onAuthFormFieldChange(field, value)).toEqual({
      type: ON_AUTH_FORM_FIELD_CHANGE,
      payload: {field: field, value: value}
    })
  })

  /**
   * ### async tests
   * 
   * the following tests describe the actions that should be
   * dispatched the function is invoked
   *
   * *Note*: these tests are run with ```it``` because they are async
   *
   */
  it('should logout', () => {
    const expectedActions = [
      {type: LOGOUT_REQUEST},
      {type: REGISTER},
      {type: LOGOUT_SUCCESS},
      {type: ACCESSTOKEN_GET_START},
      {type: ACCESSTOKEN_GET_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.logout())
  })

  it('should login', () => {
    const expectedActions = [
      {type: LOGIN_REQUEST},
      {type: LOGOUT},
      {type: LOGIN_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.login('foo','bar'))
  })

  it('should getAccessToken', () => {
    const expectedActions = [
      {type: ACCESSTOKEN_GET_START},      
      {type: LOGOUT},
      {type: ACCESSTOKEN_GET_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.getAccessToken())
  })

  it('should register', () => {
    const expectedActions = [
      {type: USER_REGISTER_START},      
      {type: LOGOUT},
      {type: USER_REGISTER_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.register('user','email','password'))
  })

  it('should resetPassword', () => {
    const expectedActions = [
      {type: RESET_PASSWORD_REQUEST},      
      {type: LOGIN},
      {type: RESET_PASSWORD_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.resetPassword('email'))
  })

  it('should deleteAccessToken', () => {
    const expectedActions = [
      {type: DELETE_TOKEN_REQUEST},
      {type: ACCESSTOKEN_GET_START},
      {type: ACCESSTOKEN_GET_SUCCESS}      
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.deleteAccessToken())
  })

})
