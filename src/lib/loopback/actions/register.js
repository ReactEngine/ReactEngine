export function register(name, email, password, modelName='User') {
  return {
    type: 'USER_REGISTER',
    payload: {
      name: name,
      email: email,
      password: password
    },
    meta: {
      modelName: modelName
    }
  };
}

export function registerSuccess(payload) {
  return {
    type: 'USER_REGISTER_SUCCESS',
    payload: payload
  };
};

export function registerPending() {
  return {
    type: 'USER_REGISTER_PENDING'
  };
}

export function registerError(err) {
  return {
    type: 'USER_REGISTER_ERROR',
    payload: err,
    error: true
  }
}
