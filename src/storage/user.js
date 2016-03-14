'use strict'
import _ from 'lodash'
import storage from 'react-native-simple-store'
import accessTokenStorage from './accessToken'
export default class User {

  constructor () {
    this.STRORE_KEY = 'currentUser';
  }
  
  save(user) {
    if(_.has(user,'accessToken')){
      new accessTokenStorage().save(user.accessToken)
    }
    return storage.save(this.STRORE_KEY,user)
  }

  get() {
    return storage.get(this.STRORE_KEY)
  }

  delete() {
    return storage.delete(this.STRORE_KEY)
  }
}

