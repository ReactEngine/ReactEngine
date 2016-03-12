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
import * as logoutActions from '../actions'
import * as globalActions from '../../../global/actions'

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../../../common/components/Header'
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
    flex: 1
  }
})
/**
 * ## Redux boilerplate
 */
const actions = [
  logoutActions,
  globalActions
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
            <Header isFetching={this.props.userLogout.form.isFetching}
                    showState={this.props.global.showState}
                    currentState={this.props.global.currentState}
                    onGetState={this.props.actions.getState}
                    onSetState={this.props.actions.setState}
            />
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
