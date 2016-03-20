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

  render() {
    console.log(">>>>>>>>> DetailComponent render,state:",this.state)
    let self = this

    this.errorAlert.checkError(this.props.form.error)

    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <DetailForm
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
