export default asyncDispatch = store => next => action =>
  typeof action === 'function' ?
  action(store.dispatch, store.getState) :
  next(action)
