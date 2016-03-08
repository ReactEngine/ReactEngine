
export class Endpoint {
  constructor(url,
              {
                withCSRF = false,
                CSRFHeaderName = 'X-CSRFToken',
                CSRFCookieName = 'csrftoken',
                setCSRF
              } = {}) {
    this.withCSRF = withCSRF;
    this.CSRFHeaderName = CSRFHeaderName;
    this.CSRFCookieName = CSRFCookieName;
    this.setCSRF = setCSRF;
    this.url = url;
  }

  list(params) {
    return agent.get(this.url).query(params);
  }

  retrieve(id) {
    return agent.get(this._getObjectURL(id));
  }

  create(conf) {
    return this._setCSRFHeader(agent.post(this.url)).send(conf);
  }

  update(conf, id) {
    return this._setCSRFHeader(agent.put(this._getObjectURL(id))).send(conf);
  }

  _getObjectURL(id) {
    let slash = '';
    if (!this.url.endsWith('/')) {
      slash = '/';
    }
    return `${this.url}${slash}${id}`;
  }

  _setCSRFHeader(request) {
    if (this.setCSRF) {
      return this.setCSRF(request);
    }
    if (!this.withCSRF) {
      return request;
    }
    if (!this._csrfSafeMethod(request.method)) {  // && !this.crossDomain) {
      request.set(this.CSRFHeaderName, this._getCookie(this.CSRFCookieName));
    }
    return request;
  }

  // Set csrf token for ajax requests
  // See https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
  _getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  _csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
}
