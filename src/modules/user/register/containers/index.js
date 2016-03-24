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
 * The necessary React 
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

let Register = React.createClass({

  render() {
    return(
      <UserComponent 
          loginButtonText={ 'Register' }
          onButtonPress={()=>{
            const username =  this.props.userRegister.form.fields.username
            const email = this.props.userRegister.form.fields.email
            const password = this.props.userRegister.form.fields.password
            this.props.actions.register (username, email, password)
          }}
          displayPasswordCheckbox ={ false }
          currentViewState={ this.props.userRegister }
          formFieldChange={ this.props.actions.formFieldChange }
          global={ this.props.global }
      />

    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
