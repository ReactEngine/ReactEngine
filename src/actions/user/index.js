import _            from 'lodash'
// import reduxCrud    from 'redux-crud'
// const standardActionCreators = reduxCrud.actionCreatorsFor('user')
import * as loginActions from './login'
import * as logoutActions from './logout'
import * as resetPasswordActions from './resetPassword'
import * as signupActions from './signup'

let userActions = {
}

userActions = _.extend(userActions,loginActions, logoutActions,resetPasswordActions,signupActions)

export default userActions