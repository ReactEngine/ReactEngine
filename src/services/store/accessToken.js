'use strict'

import store from 'react-native-simple-store'

export default class AccessToken {

  constructor () {
    this.STRORE_KEY = 'AccessToken';
  }

  /**
   * ### store
   * Store the session key 
   */
  store(accessToken) {
    return store.save(this.STRORE_KEY,{
      accessToken: accessToken
    })
  }
  /**
   * ### get
   * @param {Object} accessToken the currentUser object from maxleap.cn
   *
   * When Hot Loading, the accessToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  get(accessToken) {
    if (accessToken) {
      return store.save(this.STRORE_KEY,{
          accessToken: accessToken
      }).then(() => {
        return store.get(this.STRORE_KEY)
      })
    }
    return store.get(this.STRORE_KEY)
  }
  /**
   * ### delete
   * Deleted during log out
   */
  delete() {
    return store.delete(this.STRORE_KEY)
  }
}

