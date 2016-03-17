'use strict'

import _ from 'lodash'
import User from './models/user'
import Todo from './models/todo'
import defaultConfig from './config'

export default class Strongloop {

  constructor(config = {}) {
  	
  	config = _.assign({},defaultConfig,config)
    this.user = new User(config)
    this.todo = new Todo(config)
  }

}