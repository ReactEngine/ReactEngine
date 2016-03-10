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
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'
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
  authActions,
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
    borderTopWidth: 2,
    borderBottomWidth:2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
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
	<Text style={ styles.summary }>App Startup Screen</Text>
      </View>
    )
  }
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)

