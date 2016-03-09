/**
 * # AppAuthToken.js
 * 
 * Simple mock of lib/AppAuthToken.js
 */
'use strict';
/**
 * ## Async
 * 
 * Need to still treat as async
 */ 
require('regenerator/runtime');
export default class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * ### getAccessToken
   * @returns {Object} sessionToken
   */
  async getAccessToken () {
    return await {
      sessionToken: {
        sessionToken: 'token'
      }
    };
  }
  /**
   * ### storeAccessToken
   * @returns {Object} empty
   */
  async storeAccessToken() {
    return await {};
  }
  /**
   * ### deleteAccessToken
   */  
  async deleteAccessToken () {
    return await {};
  }
};


