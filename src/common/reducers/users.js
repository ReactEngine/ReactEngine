import SI         from 'seamless-immutable'
import reduxCrud  from 'redux-crud'

const standardReducers = reduxCrud.reducersFor('users')

function reducers(state=SI([]), action) {
  switch(action.type) {
    default:
      // pass to the generated reducers
      return standardReducers(state, action)
  }
}

export default reducers
