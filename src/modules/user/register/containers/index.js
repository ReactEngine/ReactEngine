/**
 * Register.js
 * 
 * Allow user to register 
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
import * as viewActions from '../actions'

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 *   LoginRender
 */
import LoginRender from '../../components'

/**
 * The necessary React 
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
  viewActions
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

function buttonPressHandler(register, username, email, password) {
  register (username, email, password)
}

let Register = React.createClass({

  render() {
    let loginButtonText = 'Register'
    let onButtonPress = buttonPressHandler.bind(this.props.actions.register,
					        this.props.userRegister.form.fields.username,
					        this.props.userRegister.form.fields.email,
					        this.props.userRegister.form.fields.password
		        )

    return(
      <LoginRender 
          formType={ userRegister }
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }				
          displayPasswordCheckbox ={ true }
          leftMessageType={ userForgotPassword }
          rightMessageType={ userLogin }
          auth={ this.props.this.props.userRegister }
          global={ this.props.global }
      />

    )
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)
