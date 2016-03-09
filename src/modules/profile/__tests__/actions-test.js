/**
 * # profileActions.js
 * 
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 * 
 */
'use strict'

/**
 * ## Mocks
 *
 * turn mocking off but mock store and Maxleap
 *
 */
jest.autoMockOff()

jest.mock('../../../../lib/store')
jest.mock('../../../../api')
/**
 * ## Store
 * The mockStore will validate the actions are performed 
 */
const mockStore = require('../../mocks/Store').default
const actions = require('../actions')

/**
 * ## Actions to test
 */
const {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE

} = require('../../../common/constants').default

/**
 * ## Tests
 * 
 * profileActions
 */
describe('profileActions', () => {
  /**
   * ### simple tests that prove the actions have the specific type
   */   
  it('should getProfileRequest', () => {
    expect(actions.getProfileRequest()).toEqual({type: USER_GET_REQUEST})
  })

  it('should getProfileSuccess', () => {
    var json = {json: true}
    expect(actions.getProfileSuccess(json)).toEqual({type:
                                                     USER_GET_SUCCESS,
                                                     payload: json})
  })

  it('should getProfileFailure', () => {
    var json = {json: true}
    expect(actions.getProfileFailure(json)).toEqual({type:
                                                     USER_GET_FAILURE,
                                                     payload:json})
  })
  
  it('should profileUpdateRequest', () => {
    expect(actions.profileUpdateRequest()).toEqual({type: USER_UPDATE_REQUEST})
  })

  it('should profileUpdateSuccess', () => {
    expect(actions.profileUpdateSuccess()).toEqual({type: USER_UPDATE_SUCCESS})
  })

  it('should profileUpdateFailure', () => {
    var json = {json: true}
    expect(actions.profileUpdateFailure(json)).toEqual({type:
                                                        USER_UPDATE_FAILURE,
                                                        payload:json})
  })

  it('should onProfileFormFieldChange', () => {
    let field = 'field'
    let value = 'value'
    expect(actions.onProfileFormFieldChange(field, value)).toEqual({
      type: ON_PROFILE_FORM_FIELD_CHANGE,       payload: {field: field, value: value}})
  })

  /**
   * ### async tests
   * 
   * the following tests describe the actions that should be
   * dispatched the function is invoked
   *
   * *Note*: these tests are run with ```pit``` because they are async
   *
   */
  it('should getProfile', () => {
    const expectedActions = [
      {type: USER_GET_REQUEST},
      {type: USER_GET_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.getProfile())
  })

  it('should updateProfile', () => {
    const expectedActions = [
      {type: USER_UPDATE_REQUEST},
      {type: USER_UPDATE_SUCCESS},
      {type: USER_GET_REQUEST},
      {type: USER_GET_SUCCESS}
    ]

    const store = mockStore({}, expectedActions)
    return store.dispatch(actions.updateProfile('userid','username','email'))
  })

})
