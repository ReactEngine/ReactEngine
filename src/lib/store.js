/**
 * # store.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict'
import store from 'react-native-simple-store'

const propsPrefix = 'RE_'

const ACCESSTOKEN_KEY =  propsPrefix + "ACCESSTOKEN"

export default store {

  get(key){
    return store.get(propsPrefix + key)
  }
  save(key,value = ''){
    return store.save(propsPrefix + key,value)
  }
  set(key,value = ''){
    return store.save(propsPrefix + key,value)
  }
  delete(key){
    return store.delete(propsPrefix + key)
  }
  remove(key){
    return store.delete(propsPrefix + key)
  }
  /**
   * ### storeAccessToken
   * Store the session key
   */
  setAccessToken(accessToken) {
    return store.save(ACCESSTOKEN_KEY,{
      accessToken: accessToken
    })
  }
  /**
   * ### getAccessToken
   * @param {Object} accessToken the currentUser object from Server
   *
   * When Hot Loading, the accessToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getAccessToken(accessToken) {
    if (accessToken) {
      return store.save(ACCESSTOKEN_KEY,{
          accessToken: accessToken
      }).then(() => {
        return store.get(ACCESSTOKEN_KEY)
      })
    }
    return store.get(ACCESSTOKEN_KEY)
  }
  /**
   * ### deleteAccessToken
   * Deleted during log out
   */
  deleteAccessToken() {
    return store.delete(ACCESSTOKEN_KEY)
  }
}
