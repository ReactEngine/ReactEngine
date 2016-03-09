/**
 * # AppAuthToken.js
 * 
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 * 
 * Redux  & the config file
 */ 
import store from 'react-native-simple-store';

export default class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */
  constructor () {
    this.SESSION_TOKEN_KEY =  "";
  }

  /**
   * ### storeAccessToken
   * Store the session key 
   */
  storeAccessToken(sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY,{
      sessionToken: sessionToken
    });

  }
  /**
   * ### getAccessToken
   * @param {Object} sessionToken the currentUser object from Server
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getAccessToken(sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY,{
          sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY);
      });
    }
    return store.get(this.SESSION_TOKEN_KEY);
  }
  /**
   * ### deleteAccessToken
   * Deleted during log out
   */
  deleteAccessToken() {
    return store.delete(this.SESSION_TOKEN_KEY);
  }
}

