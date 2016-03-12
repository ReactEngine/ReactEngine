/**
 * ## States
 * AppComponent explicitly defines initial state
 *
 */
import userRegisterInitialState from './modules/user/register/initialState'
import userLoginInitialState from './modules/user/login/initialState'
import userLogoutInitialState from './modules/user/logout/initialState'
import userForgotPasswordInitialState from './modules/user/forgotPassword/initialState'
import deviceInitialState from './modules/device/deviceInitialState'
import globalInitialState from './modules/global/globalInitialState'
import userProfileInitialState from './modules/user/profile/initialState'

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