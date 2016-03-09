/**
 * # Maxleap.js
 * 
 * This class interfaces with Server using the rest api
 * see [https://parse.com/docs/rest/guide](https://parse.com/docs/rest/guide)
 *
 */
'use strict';
/**
 * ## Async support
 * 
 */ 
require('regenerator/runtime');

/**
 * ## Imports
 * 
 * Config for defaults and lodash for a couple of features
 */ 
import CONFIG from './config';
import _ from 'lodash';
import Backend from './Backend';

export default class Maxleap extends Backend{
  /**
   * ## Maxleap
   *
   * constructor sets the default keys required by Server
   * if a user is logged in, we'll need the accessToken
   *
   * @throws tokenMissing if token is undefined
   */
  constructor( token) {
    super(token);
    if (!_.isNull(token) && _.isUndefined(token.accessToken)) {
      throw 'TokenMissing';
    }
    this._accessToken =
      _.isNull(token) ?  null :  token.accessToken.accessToken;
    
    this._applicationId = CONFIG.MAXLEAP.APP_ID;
    this._restAPIKey = CONFIG.MAXLEAP.REST_API_KEY;
    this._masterKey = null;

    this.API_BASE_URL= 'https://api.maxleap.cn';
  }
  /**
   * ### signup
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
  async signup(data) {
    return await this._fetch({
      method: 'POST',
      url: '/2.0/users',
      body: data
    })
      .then((response) => {
        var json = JSON.parse(response._bodyInit);        
        if (response.status === 200 || response.status === 201) {
          return json;
        } else {
          throw(json);
        }
      })
      .catch((error) => {
        throw(error);
      });

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
   * email: "barton@foo.com"
   * objectId: "Z4yvP19OeL"
   * accessToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * username: "barton"
   *
   */
  async login(data) {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return await this._fetch({
      method: 'GET',
      url: '/2.0/login?' + formBody
    })
      .then((response) => {
        var json = JSON.parse(response._bodyInit);
        if (response.status === 200 || response.status === 201) {
          return json;
        } else {
          throw(json);
        }
      })
      .catch((error) => {
        throw(error);
      });

  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */  
  async logout() {
    return await this._fetch({
      method: 'POST',
      url: '/2.0/logout',
      body: {}
    })
      .then((response) => {
        var  res = JSON.parse(response._bodyInit);        
        if ((response.status === 200 || response.status === 201)
            || //invalid session token
            (response.status === 400 && res.code === 209)) {
          return {};
        } else {
          throw({code: 404, error: 'unknown error from Server'});
        }
      })
      .catch((error) => {
        throw(error);
      });

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
      url: '/2.0/requestPasswordReset',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {};
        } else {
          var  res = JSON.parse(response._bodyInit);                  
          throw(res);
        }
      })
      .catch((error) => {
        throw(error);
      });
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
  async getProfile() {
    return await this._fetch({
      method: 'GET',
      url: '/2.0/users/me'
    })
      .then((response) => {
        var  res = JSON.parse(response._bodyInit);
        if ((response.status === 200 || response.status === 201)) {
          return res;
        } else {
          throw(res);
        }
      })
      .catch((error) => {
        throw(error);
      });
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id of Server
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile(userId,data) {
    return await this._fetch({
      method: 'PUT',
      url: '/2.0/users/' + userId,
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {};
        } else {
          var  res = JSON.parse(response._bodyInit);          
          throw(res);
        }
      })
      .catch((error) => {
        throw(error);
      });

  }  
  /**
   * ### _fetch
   * A generic function that prepares the request to Server
   */  
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: {
        'X-ML-Application-Id': this._applicationId,
        'X-ML-REST-API-Key': this._restAPIKey
      }
    };
    if (this._accessToken) {
      reqOpts.headers['X-ML-Session-Token'] = this._accessToken;
    }
    
    if (this._masterKey) {
      reqOpts.headers['X-ML-Master-Key'] = this.masterKey;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(this.API_BASE_URL + opts.url, reqOpts);

  }
};

