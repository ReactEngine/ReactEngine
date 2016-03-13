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
 *   UserComponent
 */
import UserComponent from '../../components'

/**
 * Need React
 */
import React from 'react-native'

const {
  USER_REGISTER,
  USER_LOGIN,
  USER_FORGOTPASSWORD
} = require('../../constants').default

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
					        this.props.actions.forgotPassword,
					        this.props.userForgotPassword.form.fields.email
		                               )

    return(
      <UserComponent 
          formType={ USER_FORGOTPASSWORD }
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }
          displayPasswordCheckbox={ false }
          leftMessageType = { USER_REGISTER }
          rightMessageType = { USER_LOGIN }
          currentViewState={ this.props.userForgotPassword }
          formFieldChange={ this.props.actions.formFieldChange }
          global={ this.props.global }
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
