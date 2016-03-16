require('regenerator/runtime')
import _ from 'lodash'
import CONFIG from './config'

export function successHandle(response) {
  var json = JSON.parse(response._bodyInit)
  if (response.status === 200 || response.status === 201) {
    return json
  } else {
    throw (json)
  }
}
export function errorHandle(error) {
  throw (error)
}

export async function request(opts) {
  opts = _.extend({
    method: 'GET',
    url: null,
    body: null,
    callback: null
  }, opts)

  var reqOpts = {
    method: opts.method,
    headers: {}
  }

  if (global.$RE && global.$RE.currentUser && global.$RE.currentUser.accessToken) {
    reqOpts.headers['authorization'] =  global.$RE.currentUser.accessToken
  }

  if (opts.method === 'POST' || opts.method === 'PUT') {
    reqOpts.headers['Accept'] = 'application/json'
    reqOpts.headers['Content-Type'] = 'application/json'
  }

  if (opts.body) {
    reqOpts.body = JSON.stringify(opts.body)
  }
  return await fetch(CONFIG.baseUrl + opts.url, reqOpts)
}