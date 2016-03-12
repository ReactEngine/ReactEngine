/**
 * ## States
 * AppComponent explicitly defines initial state
 *
 */
import userRegisterInitialState from './user/register/initialState'
import userLoginInitialState from './user/login/initialState'
import userLogoutInitialState from './user/logout/initialState'
import userForgotPasswordInitialState from './user/forgotPassword/initialState'
import deviceInitialState from './device/deviceInitialState'
import globalInitialState from './global/globalInitialState'
import userProfileInitialState from './user/profile/initialState'



/**
 *
 * ## Initial state
 * Create instances for the keys of each structure
 * @returns {Object}
 */
export default const initialState {
    userRegister: (new userRegisterInitialState),
    userLogin: (new userLoginInitialState),
    userLogout: (new userLogoutInitialState),
    userForgotPassword: (new userForgotPasswordInitialState),
    device: (new deviceInitialState).set('isMobile',true),
    global: (new globalInitialState),
    userProfile: (new userProfileInitialState)
  }