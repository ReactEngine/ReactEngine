require('regenerator/runtime')
import * as utils from './utils'

export default class {
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
      return await utils.request({
          method: 'POST',
          url: 'Users',
          body: data
        })
        .then(utils.successHandle)
        .catch(utils.errorHandle)
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
      return await utils.request({
          method: 'POST',
          url: 'Users/login',
          body: data
        })
        .then(utils.successHandle)
        .catch(utils.errorHandle)
    }
    /**
     * ### logout
     * prepare the request and call _fetch
     */
  async logout() {
      return await utils.request({
          method: 'POST',
          url: 'Users/logout',
          body: {}
        })
        .then((response) => {
          var res = JSON.parse(response._bodyInit)
          if ((response.status === 200 || response.status === 201) || //invalid session token
            (response.status === 400 && res.code === 209)) {
            return {}
          } else {
            throw ({
              code: res.statusCode,
              error: res.message
            })
          }
        })
        .catch((error) => {
          throw (error)
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
  async forgotPassword(data) {
      return await utils.request({
          method: 'POST',
          url: 'Users/reset',
          body: data
        })
        .then(utils.successHandle)
        .catch(utils.errorHandle)
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
      return await utils.request({
          method: 'GET',
          url: 'Users/' + userId,
        })
        .then(utils.successHandle)
        .catch(utils.errorHandle)
    }
    /**
     * ### updateProfile
     * for utils user, update their record
     * the data is already in JSON format
     *
     * @param userId  _id of maxleap.cn
     * @param data object:
     * {username: "barton", email: "barton@foo.com"}
     */
  async updateProfile(userId, data) {
    return await utils.request({
        method: 'PUT',
        url: 'Users/' + userId,
        body: data
      })
      .then(utils.successHandle)
      .catch(utils.errorHandle)
  }
}