require('regenerator/runtime')
import _ from 'lodash'

export default Utils {

/**
   * ### fetch
   * A generic function that prepares the request to Server
   */
  async fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOptions = {
      method: opts.method,
      headers: {
      }
    }

    if (this._accessToken) {
      reqOptions.headers['Authorization'] = 'Bearer ' + this._accessToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOptions.headers['Accept'] = 'application/json'
      reqOptions.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOptions.body = JSON.stringify(opts.body)
    }

    return await fetch(opts.url, reqOptions)

  }
}
