/**
 * # store.js
 * 
 * Simple mock of lib/store.js
 */
'use strict'
/**
 * ## Async
 * 
 * Need to still treat as async
 */ 
require('regenerator/runtime')
export default class store {
  /**
   * ## store
   *
   * ### getAccessToken
   * @returns {Object} accessToken
   */
  async getAccessToken () {
    return await {
      accessToken: {
        accessToken: 'token'
      }
    }
  }
  /**
   * ### storeAccessToken
   * @returns {Object} empty
   */
  async storeAccessToken() {
    return await {}
  }
  /**
   * ### deleteAccessToken
   */  
  async deleteAccessToken () {
    return await {}
  }
}


