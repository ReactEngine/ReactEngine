/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
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
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

/**
 * The necessary components from React
 */
import React,
{ 	
  StyleSheet,
  View,
  Text
}
from 'react-native'

/**
 * If your app uses Redux action creators, you can add them here...
 * 
 */
const actions = [
]

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
      ...state
  }
}

/*
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
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

/**
 * ## Subview class
 */
let Subview = React.createClass({
  
  render() {

    var titleConfig = {
      title: this.props.title || "Detail View"
    }
    
    var leftButtonConfig = {
      title: 'Back',
      handler: routerActions.pop
    }

    let detailData = this.props.data || {
      "completed": true,
      "text": "",
      "id": "",
      "createdAt": "",
      "updatedAt": ""
    }

    return(
      <View>
      	<NavigationBar
                  title={ titleConfig }
                  leftButton={ leftButtonConfig }
      	/>
      	<View style={ styles.container }>
      	  <Text style={ styles.summary }>text: {detailData.text}</Text>
          <Text style={ styles.summary }>completed: {detailData.completed+''}</Text>
          <Text style={ styles.summary }>id: {detailData.id}</Text>
          <Text style={ styles.summary }>createdAt: {detailData.createdAt}</Text>
          <Text style={ styles.summary }>updatedAt: {detailData.updatedAt}</Text>
      	</View>
      </View>
    )
  }
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Subview)
