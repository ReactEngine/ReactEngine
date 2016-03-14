/**
 * # Logout.js
 * 
 *
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
import * as logoutActions from '../actions/async'

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../../../common/components/FormButton'

/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  View
}
from 'react-native'

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop:80
  }
})
/**
 * ## Redux boilerplate
 */
const actions = [
  logoutActions
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

class Logout extends Component {

  /**
   * ### render
   * Setup some default presentations and render 
   */
  render() {
    let self = this
    
    let onButtonPress = () => {
			this.props.actions.logout()
		}
     return (
        <View style={styles.container}>
          <View>
            <FormButton
                isDisabled={!this.props.userLogout.form.isValid || this.props.userLogout.form.isFetching}
                onPress={onButtonPress.bind(self)}
                buttonText={'Log out'}/>
          </View>
        </View>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
