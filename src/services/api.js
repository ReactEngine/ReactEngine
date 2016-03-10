/**
 * # Parse.js
 * 
 * This class interfaces with maxleap.cn using the rest api
 * see [https://parse.com/docs/rest/guide](https://parse.com/docs/rest/guide)
 *
 */
'use strict'

import CONFIG from './config'
import Strongloop from './strongloop'

export default function ApiFactory(token = null) {
    return new Strongloop(token)
}
