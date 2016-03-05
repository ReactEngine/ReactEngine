import {create} from './actions/create';
import {login} from './actions/login';
import {find, findById} from './actions/find';
import {register, registerPending, registerSuccess, registerError} from './actions/register';
import loginHandler from './action-handlers/login';
import registerHandler from './action-handlers/register';
import {execModelMethod} from './model';

export const actions = {
    create: create,
    login: login,
    register: register,
    find: find,
    findById: findById
};

const actionHandlers = {
    'USER_LOGIN': loginHandler,
    'USER_REGISTER': registerHandler,
    'MODEL_FIND': execModelMethod,
    'MODEL_FIND_BY_ID': execModelMethod
};

export default function(app, options={}) {
  const loopbackMiddleware = store => next => action => {
      if (actionHandlers[action.type]) {
          if (options.syncAppWithState) {
            options.syncAppWithState(app, store.getState());
          }
          actionHandlers[action.type](app, store, action);
      }
      return next(action);
  }
  return loopbackMiddleware;
}
