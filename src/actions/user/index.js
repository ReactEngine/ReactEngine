import _            from 'lodash'
// import reduxCrud    from 'redux-crud'
// const standardActionCreators = reduxCrud.actionCreatorsFor('user')
import * as loginActions from './login'
import * as logoutActions from './logout'
import * as resetPasswordActions from './resetPassword'
import * as registerActions from './register'

let userActions = {
}

userActions = _.extend(userActions,loginActions, logoutActions,resetPasswordActions,registerActions)

export default userActions