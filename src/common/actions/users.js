import _            from 'lodash';
import reduxCrud    from 'redux-crud';

const standardActionCreators = reduxCrud.actionCreatorsFor('users');

let actionCreators = {
  update(user) {
    return function(dispatch) {
      // dispatch a `updateStart` for optimistic updates
      const action = standardActionCreators.updateStart(user);
      dispatch(action);

      // send the request
      const url = `/users/${user.id}`;
      const promise = someAjaxLibrary({
        url: url,
        method: 'PUT',
        data: {
          user
        }
      });

      promise.then(function(response) {
          // dispatch the success action
          const user = response.data.data;
          const action = standardActionCreators.updateSuccess(user);
          dispatch(action);
        }, function(response) {
          // rejection
          // dispatch the error action
          // first param is the error
          const action = standardActionCreators.updateError(response, user);
          dispatch(action);
        }).catch(function(err) {
          console.error(err.toString());
        });

      return promise;
    }
  },
}

actionCreators = _.extend(actionCreators, standardActionCreators);

export default actionCreators;