/**
 * # app.js
 *  Display startup screen and 
 *  getAccessTokenAtStartup which will navigate upon completion 
 *
 *   
 *  
 */
'use strict'
/*
 * ## Imports
 *  
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Immutable Map
 */
import {Map} from 'immutable'

/**
 * Project actions
 */
import * as registerActions from '../modules/register/actions'
import * as loginActions from '../modules/login/actions'
import * as logoutActions from '../modules/logout/actions'
import * as forgotPasswordActions from '../modules/forgotPassword/actions'

import * as deviceActions from '../modules/device/deviceActions'
import * as globalActions from '../modules/global/globalActions'

import * as accessTokenAsyncActions from '../asyncActions/accessToken'

/**
 * The components we need from ReactNative
 */
import React,
{ 	
  StyleSheet,
  View,
  Text
}
from 'react-native'

/**
 * ## Actions
 * 3 of our actions will be available as ```actions```
 */
const actions = [
  registerActions,
  loginActions,
  logoutActions,
  forgotPasswordActions,
  deviceActions,
  globalActions,
  accessTokenAsyncActions
]

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
      ...state
  }
}

/**
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```
 */
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


var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 40,
    fontWeight: 'bold'
  }
})

/**
 * ## App class
 */
let App = React.createClass({
  /**
   * See if there's a accessToken from a previous login
   * 
   */
  componentDidMount() {
    this.props.actions.getAccessToken()
  },
  
  render() {
    return(
      <View style={ styles.container }>
	<Text style={ styles.summary }>React Engine</Text>
      </View>
    )
  }
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)

