import * as syncActions from './sync'
import logoutActions from '../../user/logout/actions'

import { Actions }  from 'react-native-router-flux'
const  routerActions = Actions

import accessTokenStorage from '../../../storage/accessToken'



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
    //删除开始
    dispatch(syncActions.DeleteStart())
    
    return new  accessTokenStorage().delete()
      .then(() => {
        //删除成功
        dispatch(syncActions.DeleteSuccess())
      })
      .catch(error=>{
        //删除失败
        dispatch(syncActions.DeleteFailure(error))
      })
  }
}