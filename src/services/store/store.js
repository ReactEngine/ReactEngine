/**
 * # store.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict'
import store from 'react-native-simple-store'

const prefix = '$re_$'

export default const store {

  get(key){
    return store.get(prefix + key)
  }
  save(key,value = ''){
    return store.save(prefix + key,value)
  }
  set(key,value = ''){
    return store.save(prefix + key,value)
  }
  delete(key){
    return store.delete(prefix + key)
  }
  remove(key){
    return store.delete(prefix + key)
  }
}
