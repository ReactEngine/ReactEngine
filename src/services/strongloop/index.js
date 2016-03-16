'use strict'

import _ from 'lodash'
import User from './user'

export default class Strongloop {

  constructor(token = "") {
    this.user = new User(token)
  }

}