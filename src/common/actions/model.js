import _            from 'lodash'
import reduxCrud    from 'redux-crud'
import Utils from '../../lib/utils'

const standardActionCreators = reduxCrud.actionCreatorsFor('model')

let actionCreators = {
  update(model) {
    return function(dispatch) {
      // dispatch a `updateStart` for optimistic updates
      const action = standardActionCreators.updateStart(model)
      dispatch(action)

      // send the request
      const promise = someAjaxLibrary({
        url: url,
        method: 'PUT',
        data: {
          user
        }
      })

      promise.then(function(response) {
          // dispatch the success action
          const user = response.data.data
          const action = standardActionCreators.updateSuccess(model)
          dispatch(action)
        }, function(response) {
          // rejection
          // dispatch the error action
          // first param is the error
          const action = standardActionCreators.updateError(response, model)
          dispatch(action)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },
}

actionCreators = _.extend(actionCreators, standardActionCreators)

export default actionCreators
