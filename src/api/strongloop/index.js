/**
 * # Strongloop.js
 * 
 * This class interfaces with Strongloop.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 */
'use strict'
/**
 * ## Async support
 * 
 */ 
require('regenerator/runtime')
import Utils from './utils'
import User from './user'

/**
 * ## Imports
 * 
 * Config for defaults and lodash for a couple of features
 */ 
import CONFIG from './config'
import _ from 'lodash'

export default class Strongloop {
  /**
   * ## Strongloop.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor(token) {
    if (!_.isNull(token) && _.isUndefined(token.accessToken)) {
      throw 'TokenMissing'
    }
    this._accessToken =
      _.isNull(token) ?  null :  token.accessToken.accessToken
    
  }

 
}

