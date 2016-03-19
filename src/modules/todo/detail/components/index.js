/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'


/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'

import DetailForm from './form'
/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../../../common/components/ErrorAlert'
/**
 * The FormButton will respond to the press
 */
import FormButton from '../../../common/components/FormButton'

/**
 * The necessary components from React
 */
import React,
{
  StyleSheet,
  View,
  Text,
  Component
}
from 'react-native'

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})
  class DetailView extends Component {
  /**
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      formValues: {
      }
    }
  }
  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {
    this.setState({
      formValues: props.data
    })
  }

  render() {
    let self = this

    this.errorAlert.checkError(this.props.form.error)

    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <DetailForm
              value={this.state.formValues}
              updateAction={this.props.update}
              formFieldChangeAction={this.props.formFieldChange}
              form={this.props.form}
          />
        </View>
        <FormButton
            isDisabled={!this.props.form.isValid || this.props.form.isFetching}
            onPress={this.props.onButtonPress}
            buttonText={this.props.buttonText}/>
      </View>
    )
  }

}

export default DetailView
