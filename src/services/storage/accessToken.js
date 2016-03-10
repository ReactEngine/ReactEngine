'use strict'

import storage from 'react-native-simple-store'

export default class AccessToken {

  constructor () {
    this.STRORE_KEY = 'AccessToken';
  }

  /**
   * ### storage
   * Store the session key 
   */
  save(accessToken) {
    return storage.save(this.STRORE_KEY,{
      accessToken: accessToken
    })
  }
  /**
   * ### get
   * @param {Object} accessToken the currentUser object from maxleap.cn
   *
   * When Hot Loading, the accessToken  will be passed in, and if so,
   * it needs to be storaged on the device.  Remember, the storage is a
   * promise so, have to be careful.
   */
  get(accessToken) {
    if (accessToken) {
      return storage.save(this.STRORE_KEY,{
          accessToken: accessToken
      }).then(() => {
        return storage.get(this.STRORE_KEY)
      })
    }
    return storage.get(this.STRORE_KEY)
  }
  /**
   * ### delete
   * Deleted during log out
   */
  delete() {
    return storage.delete(this.STRORE_KEY)
  }
}

