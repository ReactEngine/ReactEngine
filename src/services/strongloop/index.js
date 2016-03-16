'use strict'

import _ from 'lodash'
import User from './user'
import defaultConfig from './config'

export default class Strongloop {

  constructor(config = {}) {
  	
  	config = _.assign({},defaultConfig,config)
    this.user = new User(config)
  }

}