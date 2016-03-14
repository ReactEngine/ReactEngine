/**
 * # profileActions.js
 * 
 * The actions to support the users profile
 */
'use strict'

/**
 * ApiFactory - base class for server implementation
 * accessTokenStorage for localStorage accessToken access 
 */
const ApiFactory = require('../../../../services/api').default
const userStorage = require('../../../../storage/user').default
import * as syncActions from './index'

/**
 * ## get
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getCurrentUser() {
  return dispatch => {
    return new userStorage().get()
      .then((user) => {
        
        const token = user.accessToken
        const userId = user.id
        if(!token || !userId){
          throw("get token or userId failed!")
        }else{
          //GET 请求开始
          dispatch(syncActions.getStart())
          return ApiFactory(token).getProfile(userId)
        }
      })
      .then((json) => {
          //GET 请求成功
          dispatch(syncActions.getSuccess(json))
      })
      .catch((error)=>{
         //GET 请求失败
        dispatch(syncActions.getFailure(error))
      })
  }
}

/**
 * ## update 
 * @param {string} userId -  objectId 
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} accessToken - the accessToken from maxleap.cn
 *
 * The accessToken is provided when Hot Loading.
 *
 * With the accessToken, maxleap.cn is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on maxleap.cn
 *
 */
// export function updateCurrentUser(userId, username, email) {
//   
//   console.log("updateCurrentUser")
//   return dispatch => {

//     return new userStorage().get()
//       .then((user) => {
//         const token = user.accessToken
//         const userId = user.id

//         //更新请求开始
//         dispatch(syncActions.updateStart())

//         return ApiFactory(token).updateProfile(userId,
//           {
//             username: username,
//             email: email
//           }
//         )
//       })
//       .then(() => {
//           //更新请求成功
//           dispatch(syncActions.updateSuccess())
//           dispatch(getProfile())
//       })
//       .catch((error) => {
//         //更新请求失败
//         dispatch(syncActions.updateFailure(error))
//       })
//   }
// }
