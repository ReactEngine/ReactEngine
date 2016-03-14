/**
 * # Login.js
 *
 *  The container to display the Login form
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
import * as viewActions from '../actions/async'

/**
 * Immutable
 */
import {Map} from 'immutable'

/**
 *   UserComponent
 */
import UserComponent from '../components'

/**
 * The necessary React components
 */
import React from 'react-native'

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

function buttonPressHandler(login, email, password) {
  login (email, password)
}

let Login = React.createClass({

  render() {
    let loginButtonText = 'Log in'
    let onButtonPress = buttonPressHandler.bind(null,
				                this.props.actions.login,
				                this.props.userLogin.form.fields.email,
				                this.props.userLogin.form.fields.password
		                               )

    return(
      <UserComponent
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }
          displayPasswordCheckbox={ false }
          currentViewState={ this.props.userLogin }
          formFieldChange={ this.props.actions.formFieldChange }
          global={ this.props.global }
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
