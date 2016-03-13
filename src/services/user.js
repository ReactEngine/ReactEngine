import store from './store'
import _ from 'lodash'

export default User {
  global.ReacEngine = global.ReacEngine || {};
  if(global.ReacEngine.User){
    return global.ReacEngine.User
  }

  const props = ['accessToken', 'currentUserId', 'currentUserData']

  Class User() {
      constructor{
        this.load()
      }

      load(){
        const self = this
        _.each(props,(name)={
          self[name] = store.get(name) || ''
        })
      }

      save() {
        const self = this
        _.each(props,(name)={
           store.set(name,self[name])
        })
      }

      getCurrent() {
        return {
          "accessToken" : this.accessToken
          "currentUserId" : this.userId
          "currentUserData" : this.userData
        }
      }

      setCurrent(user) {
        const self = this
        if((!user.accessToken)||(!user.userId)){
          throw("user error")
          return
        }
        _.each(props,(name)={
          self[name] = user[name]
        })
      }

      clearCurrent() {
        const self = this
        _.each(props,(name)={
          self[name] = null
        })
      }

      clearStorage = function() {
        _.each(props,(name)={
          store.delete(name)
        })
      }
    }

  global.$RE = global.$RE || {}
  global.$RE.currentUser = global.$RE.currentUser || (new User())

  return global.$RE.currentUser
}
