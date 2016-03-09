import store from './store'
import _ from 'lodash'

function() {
  var props = ['accessTokenId', 'currentUserId', 'currentUserData']

  function User() {
    var self = this
    _.each(props,(name)={
      self[name] = store.get(name) || ''
    })
  }

  User.prototype.save = function() {
    var self = this
    _.each(props,(name)={
      self[name] = store.set(name,self[name])
    })
  }

  User.prototype.setUser = function(accessTokenId, userId, userData) {
    this.accessTokenId = accessTokenId
    this.currentUserId = userId
    this.currentUserData = userData
  }

  User.prototype.clearUser = function() {
    this.accessTokenId = null
    this.currentUserId = null
    this.currentUserData = null
  }

  User.prototype.clearStorage = function() {
    _.each(props,(name)={
      store.delete(name)
    })
  }

  return new User()

}
