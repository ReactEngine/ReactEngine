/**
 * # AppAuthToken.js
 * 
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict'
/**
 * ## Imports
 * 
 * Redux  & the config file
 */ 
import store from 'react-native-simple-store'


export default class AppAuthToken {

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeSessionToken(sessionToken) {
    return store.save('SESSION_TOKEN',{
      sessionToken: sessionToken
    })

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from maxleap.cn
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return store.save('SESSION_TOKEN',{
          sessionToken: sessionToken
      }).then(() => {
        return store.get('SESSION_TOKEN')
      })
    }
    return store.get('SESSION_TOKEN')
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return store.delete('SESSION_TOKEN')
  }
}

