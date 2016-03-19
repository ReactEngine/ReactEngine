'use strict'
import React,
{
  StyleSheet,
  View,
  Text
}
from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionUtils from '../../../../utils/action'
import { Actions as routerActions }  from 'react-native-router-flux'
import DetailComponent from '../components/index'
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
    marginTop:80
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

let DetailContainer = React.createClass({
  render() {
    debugger
    console.log('DetailContainer render routerChangePayload:',this.props.routerChangePayload)
    //路由组件传递的数据
    if(this.props.routerChangePayload){
       this.props.actions.routerChange(this.props.routerChangePayload)
    }

    let onButtonPress = () => {
      this.props.actions.update(
        this.props.todoDetail.form.fields.id,
        this.props.todoDetail.form.fields.text)
    }

    var titleConfig = {
      title: this.props.title || "Detail View"
    }

    var leftButtonConfig = {
      title: 'Back',
      handler: routerActions.pop
    }

    return (
      <View style={styles.container}>
        <NavigationBar
                  title={ titleConfig }
                  leftButton={ leftButtonConfig }
        />
        <DetailComponent
            onChange={this.props.actions.formFieldChange}
            form={this.props.todoDetail.form}
            buttonText={'Update'}
            onButtonPress={onButtonPress}
            formFieldChange={this.props.actions.formFieldChange}
        />
      </View>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
