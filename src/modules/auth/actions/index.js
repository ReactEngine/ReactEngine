import _            from 'lodash'
import reduxCrud    from 'redux-crud'

const standardActionCreators = reduxCrud.actionCreatorsFor('user')

let actionCreators = {

}
actionCreators = _.extend(actionCreators, standardActionCreators);

export default actionCreators;
