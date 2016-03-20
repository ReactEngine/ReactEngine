'use strict'
import React,
{
  StyleSheet,
  View,
  Text,
  Component
}
from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionUtils from '../../../../utils/action'
import { Actions as routerActions }  from 'react-native-router-flux'
import DetailForm from '../components/form'
import ErrorAlert from '../../../common/components/ErrorAlert'
import FormButton from '../../../common/components/FormButton'
import NavigationBar from 'react-native-navbar'
import * as viewActions from '../actions'

function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch),
    dispatch
  }
}

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

class DetailContainer extends Component {
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
  }
  // componentWillReceiveProps(nextprops) {
  //   console.log(">>>>>>>>>> DetailContainer componentWillReceiveProps nextprops:",nextprops)
  //   // const currentViewNextProps = nextprops.todoDetail
  //   // this.setState({
  //   //   value: {
  //   //     id: currentViewNextProps.form.fields.id,
  //   //     text: currentViewNextProps.form.fields.text,
  //   //     completed: currentViewNextProps.form.fields.completed,
  //   //   }
  //   // })
  // }
  onButtonPress(){
    // this.props.actions.updateAttributes(this.props.todoDetail.form.fields.id,this.state.value)
    this.props.actions.updateAttributes(this.props.todoDetail.form.fields.id,{
        text: this.props.todoDetail.form.fields.text,
        completed: this.props.todoDetail.form.fields.completed
    })
  }
  formFieldChange(value,fields){
    _.each(fields,(field)=>{
      this.props.actions.formFieldChange(field,value[field])
    })
  }
  render() {
    let self = this

    console.log(">>>>>>>>>> DetailContainer render,currentViewProps:",self.props.todoDetail)
    self.errorAlert.checkError(self.props.todoDetail.form.error)

    return (
      <View style={styles.container}>
        <NavigationBar
                  title={{
                    title: self.props.title || "Detail View"
                  }}
                  leftButton={{
                    title: 'Back',
                    handler: routerActions.pop
                  }}
        />
        <View style={styles.inputs}>
          <DetailForm
              onChange={self.formFieldChange.bind(self)}
              form={self.props.todoDetail.form}
          />
        </View>
        <FormButton
            isDisabled={!self.props.todoDetail.form.isValid || self.props.todoDetail.form.isFetching}
            onPress={self.onButtonPress.bind(self)}
            buttonText={'Update'}/>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
