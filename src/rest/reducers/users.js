import SI         from 'seamless-immutable';
import reduxCrud  from '../redux-bot';

const standardReducers = reduxCrud.reducersFor('user');

function reducers(state=SI([]), action) {
  switch(action.type) {
    case 'POSTS_DELETE_SUCCESS':

      return state;
    default:
      // pass to the generated reducers
      return standardReducers(state, action);
  }
}

export default reducers;
