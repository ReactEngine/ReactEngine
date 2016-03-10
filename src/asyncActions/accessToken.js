import accessTokenActions from '../actions/accessToken'
import accessTokenStorage from '../storage/accessToken'
import userStateActions from '../actions/state/user'
import { Actions }  from 'react-native-router-flux'

const RouterActions = Actions

/**
 * ## Token
 * If accessTokenStorage has the accessToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getAccessToken() {
  return dispatch => {
    dispatch(accessTokenActions.GetRequest())
    
    return new accessTokenStorage().get()

      .then((token) => {
        if (token) {
          dispatch(accessTokenActions.GetSuccess(token))
          dispatch(userStateActions.logout())
         RouterActions.Tabbar()
        } else {
          dispatch(accessTokenActions.GetFailure())
         RouterActions.Register()
        }
      })
    
      .catch((error) => {
        dispatch(accessTokenActions.GetFailure(error))
        dispatch(userStateActions.login())
       RouterActions.Register()
      })
  }
}

/**
 * ## saveAccessToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with accessToken
 */
export function saveAccessToken(json) {
  return new accessTokenStorage().save(json)
}

/**
 * ## Delete session token
 *
 * Call the accessTokenStorage deleteAccessToken 
 */
export function deleteAccessToken() {
  return dispatch => {
    dispatch(accessTokenActions.DeleteRequest())
    return new  accessTokenStorage().delete()
      .then(() => {
        dispatch(accessTokenActions.DeleteRequestSuccess())
      })
  }
}