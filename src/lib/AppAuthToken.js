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
  storeAccessToken(accessToken) {
    return store.save(this.SESSION_TOKEN_KEY,{
      accessToken: accessToken
    });

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
      return store.save(this.SESSION_TOKEN_KEY,{
          accessToken: accessToken
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

