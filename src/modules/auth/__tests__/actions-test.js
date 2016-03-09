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
 * We don't want to use the devices storage, nor actually call Server
 */
jest.mock('../../../../lib/store')
jest.mock('../../../../api')

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
var actions = require('../actions')

/**
 * ## Imports
 * 
 * actions under test 
 */
const {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAILURE,

  STATE_LOGOUT,
  STATE_REGISTER,
  STATE_LOGIN,
  STATE_FORGOT_PASSWORD,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  
  ON_FORM_FIELD_CHANGE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,

  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAILURE
} = require('../../../common/constants').default

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
    expect(actions.logoutState()).toEqual({type: STATE_LOGOUT })
  })

  it('should set registerState', () => {
    expect(actions.registerState()).toEqual({type: STATE_REGISTER })
  })

  it('should set loginState', () => {
    expect(actions.loginState()).toEqual({type: STATE_LOGIN})
  })
  
  it('should set forgotPasswordState', () => {
    expect(actions.forgotPasswordState()).toEqual({type: STATE_FORGOT_PASSWORD})
  })

  it('should set logoutRequest', () => {
    expect(actions.logoutRequest()).toEqual({type: USER_LOGOUT_REQUEST})
  })

  it('should set logoutSuccess', () => {
    expect(actions.logoutSuccess()).toEqual({type: USER_LOGOUT_SUCCESS})
  })

  it('should set logoutFailure', () => {
    let error = {error: 'test error'}
    expect(actions.logoutFailure(error)).toEqual({type:
                                                  USER_LOGOUT_FAILURE,
                                                  payload: error})

  })
  
  it('should set signupRequest', () => {
    expect(actions.signupRequest()).toEqual({type: USER_SIGNUP_REQUEST})
  })

  it('should set signupSuccess', () => {
    expect(actions.signupSuccess()).toEqual({type: USER_SIGNUP_SUCCESS})
  })

  it('should set accessTokenRequest', () => {
    expect(actions.accessTokenRequest()).toEqual({type: ACCESSTOKEN_REQUEST})
  })

  it('should set accessTokenRequestSuccess', () => {
    let token = {token: 'thisisthetoken'}
    expect(actions.accessTokenRequestSuccess(token)).toEqual({
      type:ACCESSTOKEN_SUCCESS,payload:token})
  })

  it('should set accessTokenRequestFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.accessTokenRequestFailure(error)).toEqual({
      type: ACCESSTOKEN_FAILURE,payload: error })
  })

  it('should set signupFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.signupFailure(error)).toEqual({type:
                                                  USER_SIGNUP_FAILURE, payload:error})
  })

  it('should set loginRequest', () => {
    expect(actions.loginRequest()).toEqual({type: USER_LOGIN_REQUEST})
  })

  it('should set loginSuccess', () => {
    expect(actions.loginSuccess()).toEqual({type: USER_LOGIN_SUCCESS})
  })

  it('should set loginFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.loginFailure(error)).toEqual({type: USER_LOGIN_FAILURE,
                                                 payload: error})
  })

  it('should set resetPasswordRequest', () => {
    expect(actions.resetPasswordRequest()).toEqual({type: USER_RESETPASSWORD_REQUEST})
  })

  it('should set resetPasswordSuccess', () => {
    expect(actions.resetPasswordSuccess()).toEqual({type: USER_RESETPASSWORD_SUCCESS})
  })

  it('should set resetPasswordFailure', () => {
    let error = {error: 'thisistheerror'}
    expect(actions.resetPasswordFailure(error)).toEqual({type:
                                                         USER_RESETPASSWORD_FAILURE,
                                                         payload: error})


  })

  it('should set onAuthFormFieldChange', () => {
    let field = 'field'
    let value = 'value'
    expect(actions.onAuthFormFieldChange(field, value)).toEqual({
      type: ON_FORM_FIELD_CHANGE,
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
      {type: USER_LOGOUT_REQUEST},
      {type: STATE_REGISTER},
      {type: USER_LOGOUT_SUCCESS},
      {type: ACCESSTOKEN_REQUEST},
      {type: ACCESSTOKEN_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.logout())
  })

  it('should login', () => {
    const expectedActions = [
      {type: USER_LOGIN_REQUEST},
      {type: STATE_LOGOUT},
      {type: USER_LOGIN_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.login('foo','bar'))
  })

  it('should getAccessToken', () => {
    const expectedActions = [
      {type: ACCESSTOKEN_REQUEST},      
      {type: STATE_LOGOUT},
      {type: ACCESSTOKEN_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.getAccessToken())
  })

  it('should signup', () => {
    const expectedActions = [
      {type: USER_SIGNUP_REQUEST},      
      {type: STATE_LOGOUT},
      {type: USER_SIGNUP_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.signup('user','email','password'))
  })

  it('should resetPassword', () => {
    const expectedActions = [
      {type: USER_RESETPASSWORD_REQUEST},      
      {type: STATE_LOGIN},
      {type: USER_RESETPASSWORD_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.resetPassword('email'))
  })

  it('should deleteAccessToken', () => {
    const expectedActions = [
      {type: ACCESSTOKEN_REQUEST},
      {type: ACCESSTOKEN_SUCCESS}      
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.deleteAccessToken())
  })

})
