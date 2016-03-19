'use strict'
import React,
{
  StyleSheet,
  View,
  Text,
  Component
}
from 'react-native'
import { Actions as routerActions }  from 'react-native-router-flux'
import DetailForm from './form'
import ErrorAlert from '../../../common/components/ErrorAlert'
import FormButton from '../../../common/components/FormButton'

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
  class DetailComponent extends Component {
  /**
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = this.state || {
      formValues: {
        id: "",
        text: "",
        completed: true,
        createdAt: "",
        updatedAt: ""
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
    console.log(">>>>>>>>> DetailComponent componentWillReceiveProps props:",props)
    this.setState({
      formValues:{
        id: props.form.fields.id,
        text: props.form.fields.text,
        completed: props.form.fields.completed,
        createdAt: props.form.fields.createdAt,
        updatedAt: props.form.fields.updatedAt
      }
    })
  }

  render() {
    console.log(">>>>>>>>> DetailComponent render,state:",this.state)
    let self = this

    this.errorAlert.checkError(this.props.form.error)

    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <DetailForm
              value={this.state.formValues}
              updateAction={this.props.update}
              formFieldChangeAction={this.props.formFieldChangeAction}
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

export default DetailComponent
