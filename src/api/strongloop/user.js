import _ from 'lodash'
import Utils from './utils'
import CONFIG from './config'

const baseUrl = CONFIG.baseUrl+'Users/'

export default User {
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
    return await Utils.fetch({
      method: 'POST',
      url: baseUrl,
      body: data
    })
      .then((response) => {
        var json = JSON.parse(response._bodyInit)        
        if (response.status === 200 || response.status === 201) {
          return json
        } else {
          throw(json)
        }
      })
      .catch((error) => {
        throw(error)
      })

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
    return await Utils.fetch({
      method: 'POST',
      url: baseUrl+'login',
      body: data
    })
      .then((response) => {
        var json = JSON.parse(response._bodyInit)
        if (response.status === 200 || response.status === 201) {
          return json
        } else {
          throw(json)
        }
      })
      .catch((error) => {
        throw(error)
      })

  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */  
  async logout() {
    return await Utils.fetch({
      method: 'POST',
      url: baseUrl+'logout',
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
    return await Utils.fetch({
      method: 'POST',
      url: baseUrl+'reset',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var  res = JSON.parse(response._bodyInit)                  
          throw(res)
        }
      })
      .catch((error) => {
        throw(error)
      })
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
  async get(userId) {
    return await Utils.fetch({
      method: 'GET',
      url: baseUrl + userId
    })
      .then((response) => {
        var  res = JSON.parse(response._bodyInit)
        if ((response.status === 200 || response.status === 201)) {
          return res
        } else {
          throw(res)
        }
      })
      .catch((error) => {
        throw(error)
      })
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
  async update(userId,data) {
    return await Utils.fetch({
      method: 'PUT',
      url: baseUrl + userId,
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var  res = JSON.parse(response._bodyInit)          
          throw(res)
        }
      })
      .catch((error) => {
        throw(error)
      })

  }  
}