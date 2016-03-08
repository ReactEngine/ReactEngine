/**
 * ### _fetch
 * A generic function that prepares the request to Server
 */
async _fetch(opts) {
  opts = _.extend({
    method: 'GET',
    url: null,
    body: null,
    callback: null
  }, opts);

  var reqOpts = {
    method: opts.method,
    headers: {
    }
  };

  if (this._sessionToken) {
    reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken;
  }

  if (opts.method === 'POST' || opts.method === 'PUT') {
    reqOpts.headers['Accept'] = 'application/json';
    reqOpts.headers['Content-Type'] = 'application/json';
  }

  if (opts.body) {
    reqOpts.body = JSON.stringify(opts.body);
  }

  return await fetch(this.API_BASE_URL + opts.url, reqOpts);

}
