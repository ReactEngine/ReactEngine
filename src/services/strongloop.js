
'use strict'
/**
 * ## Async support
 * 
 */ 
require('regenerator/runtime')

/**
 * ## Imports
 * 
 * Config for defaults and lodash for a couple of features
 */ 
import CONFIG from './config'
import _ from 'lodash'

const ApiConfig = CONFIG.strongloop || {}

export default class Strongloop {


  /**
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor(token={}) {
    
    if(_.has(token,'accessToken')){
      this._accessToken = token.accessToken
    }else{
      this._accessToken = ""
    }
    
    this.API_BASE_URL = ApiConfig.baseUrl
  }
  successHandle (response){
      var json = JSON.parse(response._bodyInit)        
        if (response.status === 200 || response.status === 201) {
          return json
        } else {
          throw(json)
        }
  }
  errorHandle(error){
    throw(error)
  }
  /**
   * ### register
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, {createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA", 
   *   accessToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async register(data) {
    return await this._fetch({
      method: 'POST',
      url:  'Users/',
      body: data
    })
    .then(this.successHandle)
    .catch(this.errorHandle)
  }
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * accessToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login(data) {
    return await this._fetch({
      method: 'POST',
      url:  'Users/login',
      body: data
    })
    .then(this.successHandle)
    .catch(this.errorHandle)

  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */  
  async logout() {
    return await this._fetch({
      method: 'POST',
      url:  'Users/logout',
      body: {}
    })
      .then((response) => {
        var  res = JSON.parse(response._bodyInit)        
        if ((response.status === 200 || response.status === 201)
            || //invalid session token
            (response.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw(error)
      })

  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data 
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword(data) {
    return await this._fetch({
      method: 'POST',
      url:  'Users/reset',
      body: data
    })
    .then(this.successHandle)
    .catch(this.errorHandle)
  }  
  /**
   * ### getProfile
   * Using the accessToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  accessToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile(userId) {
    return await this._fetch({
      method: 'GET',
      url:  'Users/' + userId,
    })
    .then(this.successHandle)
    .catch(this.errorHandle)
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id of maxleap.cn
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile(userId,data) {
    return await this._fetch({
      method: 'PUT',
      url: 'Users/' + userId,
      body: data
    })
    .then(this.successHandle)
    .catch(this.errorHandle)
  }  
  /**
   * ### _fetch
   * A generic function that prepares the request to maxleap.cn
   */  
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
      }
    }
    
    if (this._accessToken) {
      reqOpts.headers['authorization'] = this._accessToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    return await fetch( this.API_BASE_URL + opts.url, reqOpts)

  }
}

