/**
 * # accessTokenStorage.js
 * 
 * Simple mock of services/storage/accessToken.js
 */
'use strict'
/**
 * ## Async
 * 
 * Need to still treat as async
 */ 
require('regenerator/runtime')
export default class accessTokenStorage {
  /**
   * ## accessTokenStorage
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


