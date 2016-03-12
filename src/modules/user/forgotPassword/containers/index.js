/**
 * # ForgotPassword.js
 * 
 */
'use strict'
/**
 * ## Imports
 * 
 * Redux 
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as forgotPasswordActions from '../actions'

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 *   LoginRender
 */
import LoginRender from '../../components'

/**
 * Need React
 */
import React from 'react-native'

const {
  userLogin,
  userRegister,
  userForgotPassword
} = require('../../constants/router').default

/**
  * ## Redux boilerplate
  */
const actions = [
  forgotPasswordActions
]

function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}

function buttonPressHandler(resetPassword, email) {
  resetPassword (email)
}

let ForgotPassword = React.createClass({

  render() {
    let loginButtonText = 'Reset password'
    let onButtonPress = buttonPressHandler.bind(null,
					        this.props.actions.resetPassword,
					        this.props.userForgotPassword.form.fields.email
		                               )

    return(
      <LoginRender 
          formType={ userForgotPassword }
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }
          displayPasswordCheckbox={ false }
          leftMessageType = { userRegister }
          rightMessageType = { userLogin }
          auth={ this.props.userForgotPassword }
          global={ this.props.global }
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
