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
import * as authActions from '../modules/auth/authActions'

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender'

/**
 * The necessary React 
 */
import React from 'react-native'

const {
  LOGIN, 
  REGISTER,
  FORGOT_PASSWORD
} = require('../constants').default

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
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
    let onButtonPress = buttonPressHandler.bind(null,
					        this.props.actions.register,
					        this.props.auth.form.fields.username,
					        this.props.auth.form.fields.email,
					        this.props.auth.form.fields.password
		                               )
    



    return(
      <LoginRender 
          formType={ REGISTER }
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }				
          displayPasswordCheckbox ={ true }
          leftMessageType={ FORGOT_PASSWORD }
          rightMessageType={ LOGIN }
          auth={ this.props.auth }
          global={ this.props.global }
      />

    )
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)
